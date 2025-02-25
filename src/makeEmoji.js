// import Canvas from 'canvas';
import { extractImages } from './svgHelper.js';
import { select } from './randomHelper.js';
import { emojiCfg } from './info.json';

const trimUscoreRgx = /_*$/;
const special = String.fromCodePoint(0xfe0f);
const zwj = String.fromCodePoint(0x200d);

const emojiList = [];

const charToNameMap = {};
const nameToCharMap = {};

const layers = ['bot', 'mid', 'top']

let charList;

async function* lazyLoadCfg(cfg) {
	const svg_url = new URL(`./emoji/${cfg.name}/emoji.svg`, import.meta.url);
	const svg_resp = await fetch(svg_url);
	const svg = await svg_resp.text();
	const cfgWithImages = await extractImages(svg, cfg)
	cfgWithImages.svg = svg;
	while (true) {
		yield cfgWithImages;
	}
}

// Prepare image map
async function init() {
    emojiCfg.forEach((cfg) => {
		const lazyLoader = lazyLoadCfg(cfg);
		emojiList[cfg.name] = async () => (await lazyLoader.next()).value;
		const codePoints = cfg.id
			.split('-')
			.map(v => parseInt(v, 16));
		const char = String.fromCodePoint(...codePoints);
		charToNameMap[char] = cfg.name;
		nameToCharMap[cfg.name] = char;
    });
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

async function makeSvgEmoji(...partStrings) {
    let svg = '';
    const parts = await Promise.all(partStrings.map(async p => {
        const [emojiName, partName] = p.split(':');
        const emoji = await emojiList[emojiName]();
        const char = nameToChar(emojiName);
        return { char, partName, emoji };
    }));
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
    return { svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">${svg}</svg>`, list: outString };
}

function emojiStringToPartStringList(input) {
    const parts = ['base', 'eyes', 'mouth', 'extra'];
    const choices = [];
    const emojis = [];
    let failed = false;

    let join = false;
    for (let emoji of input) {
        if (emoji === zwj) {
            join = true;
            emojis[emojis.length - 1] += emoji;
        }
        else if (join || (special.indexOf(emoji) >= 0)) {
            join = false;
            emojis[emojis.length - 1] += emoji;
        }
        else {
            emojis.push(emoji);
        }
    }

    for (const emoji of emojis) {
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

await init();

export { emojiStringToPartStringList, nameToChar, charToName, makeSvgEmoji, randomEmoji, list };