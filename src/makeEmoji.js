// import Canvas from 'canvas';
import { extractImages } from './svgHelper.js';
import { select } from './randomHelper.js';

const emoji_data_resp = await fetch('/emoji/info.json');
const { emojiNames } = await emoji_data_resp.json();

const trimUscoreRgx = /_*$/;
const special = String.fromCodePoint(0xfe0f);
const zwj = String.fromCodePoint(0x200d);

const emojiList = [];

const charToNameMap = {};
const nameToCharMap = {};

const layers = ['bot', 'mid', 'top']

let charList;

// Prepare image map
async function init() {
    await emojiNames.reduce(async (prev, name) => {
        await prev;
        // const emojiCfg = (await import(`../emoji/${name}/cfg.json`, { assert: { type: "json" } })).default;
		const emoji_cfg_resp = await fetch(`/emoji/${name}/cfg.json`);
		const emoji_cfg = await emoji_cfg_resp.json();
        if (!emoji_cfg.parts.base) { return; } // TODO: REMOVE
        // const svg = fs.readFileSync(`${__dirname}/../emoji/${name}/emoji.svg`).toString();
		const svg_resp = await fetch(`/emoji/${name}/emoji.svg`);
		const svg = await svg_resp.text();
        const cfgWithImages = await extractImages(svg, emoji_cfg)
        const codePoints = emoji_cfg.id
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
    return char in charToNameMap
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
        if ( !hasEmoji(emoji) && emoji !== " " && emoji !== "_" ) {
            failed = true;
        }
    
        const choice = charToName(emoji);
        const part = parts.shift() || 'extra';
        if (choice) {
            choices.push(`${choice}:${part}`);
        }
    }

    return { choices, failed }
}

function randomEmoji() {
    const emojiChars = select(charList, 4);
    const emojiString = emojiChars.join('');
    const { choices } = emojiStringToPartStringList(emojiString);
    return makeSvgEmoji(...choices)
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

export { emojiStringToPartStringList, nameToChar, charToName, makeSvgEmoji, randomEmoji, list, getData };