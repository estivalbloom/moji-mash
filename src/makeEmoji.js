import fs from 'fs';
import Canvas from 'canvas';
import { extractImages } from './svgHelper.js';
import { select } from './randomHelper.js';
import cfg from '../config.json' assert { type: 'json' };
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const { baseImgSize } = cfg;

const trimUscoreRgx = /_*$/;
const special = String.fromCodePoint(0xfe0f);
const zwj = String.fromCodePoint(0x200d);

const emojiList = [];
const emojiNames = fs.readdirSync(`${__dirname}/../emoji`);

const charToNameMap = {};
const nameToCharMap = {};

const layers = ['bot', 'mid', 'top']

let charList;

// Prepare image map
async function init() {
    await emojiNames.reduce(async (prev, name) => {
        await prev;
        const emojiCfg = (await import(`../emoji/${name}/cfg.json`, { assert: { type: "json" } })).default;
        if (!emojiCfg.parts.base) { return; } // TODO: REMOVE
        const svg = fs.readFileSync(`${__dirname}/../emoji/${name}/emoji.svg`).toString();
        const cfgWithImages = await extractImages(svg, emojiCfg)
        const codePoints = emojiCfg.id
            .split('-')
            .map(v => parseInt(v, 16));
        const char = String.fromCodePoint(...codePoints);
        charToNameMap[char] = name;
        nameToCharMap[name] = char;
        cfgWithImages.svg = svg;
        emojiList[name] = cfgWithImages;
    }, Promise.resolve());
    charList = Object.values(nameToCharMap);
    charList.sort().reverse();
}

function charToName(char) {
    return charToNameMap[char];
}

function hasEmoji(char) {
    return charToNameMap.has(char)
}

function nameToChar(name) {
    return nameToCharMap[name];
}

function list() {
    return charList.join('');
}

function has(emoji, partName, layer) {
    return emoji && emoji.parts && emoji.parts[partName] && emoji.parts[partName][layer];
}

function makeEmoji(size, ...partStrings) {
    const canvas = Canvas.createCanvas(baseImgSize, baseImgSize);
    const context = canvas.getContext('2d');
    const parts = partStrings.map(p => {
        const [emojiName, partName] = p.split(':');
        const emoji = emojiList[emojiName];
        const char = nameToChar(emojiName);
        return { char, partName, emoji };
    });
    const emojiUsed = Array(partStrings.length).fill('_');

    layers.forEach(layer => {
        parts.forEach((part, index) => {
            const { char, partName, emoji } = part;
            if (has(emoji, partName, layer)) {
                context.drawImage(emoji.parts[partName][layer].img, 0, 0);
                emojiUsed[index] = char;
            }
        });
    });

    const outString = emojiUsed.join('').replace(trimUscoreRgx, '');
    context.scale(size / baseImgSize);
    return { canvas: canvas, list: outString };
}

function makeSvgEmoji(...partStrings) {
    let svg = '';
    const parts = partStrings.map(p => {
        const [emojiName, partName] = p.split(':');
        const emoji = emojiList[emojiName];
        const char = nameToChar(emojiName);
        return { char, partName, emoji };
    });
    const emojiUsed = Array(partStrings.length).fill('_');

    layers.forEach(layer => {
        parts.forEach((part, index) => {
            const { char, partName, emoji } = part;
            if (has(emoji, partName, layer)) {
                svg += emoji.parts[partName][layer].svg;
                emojiUsed[index] = char;
            }
        });
    });

    const outString = emojiUsed.join('').replace(trimUscoreRgx, '');
    return { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 36 36">${svg}</svg>`, list: outString };
}

function emojiStringToPartStringList(input) {
    const parts = ['base', 'eyes', 'mouth', 'extra'];
    const choices = [];
    const emojiList = [];
    let failed = false;

    let join = false;
    for (let emoji of input) {
        if (emoji === zwj) {
            join = true;
            emojiList[emojiList.length - 1] += emoji;
        }
        else if (join || (special.indexOf(emoji) >= 0)) {
            join = false;
            emojiList[emojiList.length - 1] += emoji;
        }
        else {
            emojiList.push(emoji);
        }
    }

    for (const emoji of emojiList) {
        if ( !hasEmoji(emoji) ) {
            failed = true;
        }
    
        const choice = charToName(emoji);
        const part = parts.shift() || 'extra';
        if (choice) {
            choices.push(`${choice}:${part}`);
        }
    }

    return { output: choices, failed }
}

function randomEmoji(size, svg = false) {
    const emojiChars = select(charList, 4);
    const emojiString = emojiChars.join('');
    const partStringList = emojiStringToPartStringList(emojiString);
    if (svg) {
        return makeSvgEmoji(...partStringList);
    }
    else {
        return makeEmoji(size, ...partStringList);
    }
}

function getData() {
    return emojiNames.map(e => {
        return {
            name: e,
            char: nameToChar(e),
            svg: emojiList[e].svg
        }
    });
}

await init();

export { emojiStringToPartStringList, nameToChar, charToName, makeEmoji, makeSvgEmoji, randomEmoji, list, getData };