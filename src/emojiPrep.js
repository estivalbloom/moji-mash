import { mkdirSync, writeFile, readFileSync, readdirSync, writeFileSync } from 'fs';
import fetch from 'node-fetch';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { array } from 'yargs';
import { createInterface } from 'readline';
import { promisify } from 'util';
import { splitPaths, tagElements, generateAtlas, combinePaths } from './svgHelper';
import cfg from '../config.json' assert { type: 'json' };

const { twemojiURL } = cfg;

async function fetchEmoji(id) {
    const url = `${twemojiURL}${id}.svg`;
    const response = await fetch(url);
    return await response.text();
}

function writeCallback(err) {
    if (err) {
        console.error(err);
    }
}

function dirPath(name) {
    return `../emoji/${name}`
}

function svgPath(name) {
    return `${dirPath(name)}/emoji.svg`;
}

function atlasPath(name) {
    return `${dirPath(name)}/atlas.png`;
}

function cfgPath(name) {
    return `${dirPath(name)}/cfg.json`;
}

async function addAndPrep(id, name) {
    const data = await fetchEmoji(id);
    const splitData = splitPaths(data);
    const taggedData = tagElements(splitData);
    const atlasBuffer = await generateAtlas(taggedData);

    mkdirSync(dirPath(name), { recursive: true }); // Sync to ensure it happens before writing files
    writeFile(atlasPath(name), atlasBuffer, writeCallback);
    writeFile(svgPath(name), taggedData, writeCallback);
}

async function makeConfig(id, name) {
    const cfg = JSON.stringify({ id: id, name: name, parts: {} });
    mkdirSync(dirPath(name), { recursive: true }); // Sync to ensure it happens before writing files
    writeFile(cfgPath(name), cfg, writeCallback);
}

async function setParts(name, changes) {
    const path = cfgPath(name);
    const cfg = JSON.parse(readFileSync(path).toString());
    changes.forEach(change => {
        const { part, layer, components } = change;
        if (!('parts' in cfg)) {
            cfg['parts'] = {};
        }
        if (!(part in cfg.parts)) {
            cfg.parts[part] = {};
        }
        cfg.parts[part][layer] = components;
    });

    writeFile(path, JSON.stringify(cfg), writeCallback);
}

async function promptForParts(name) {
    const parts = [];
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const question = promisify(rl.question).bind(rl);

    const qString = 'Add a part or enter to quit: ';
    let answer = await question(qString);
    while (!(answer === "")) {
        const [part, layer, ...components] = answer.split(' ');
        const info = { part, layer, components };
        parts.push(info);
        answer = await question(qString);
    }
    rl.close();

    setParts(name, parts);
}

async function prepAtlas(name) {
    const svg = readFileSync(svgPath(name));
    const pngBuffer = await generateAtlas(svg);
    writeFile(atlasPath(name), pngBuffer, writeCallback);
}

const currentEmojiNames = readdirSync('./emoji').filter(x => !x.includes('.'));
yargs(hideBin(process.argv))
    .command('atlas [...names]', 'generate atlas files for SVGs', yargs => {
        return yargs
            .positional('names', {
                describe: 'human-readable emoji names; omit to generate all',
                default: currentEmojiNames,
                type: array
            })
    }, async argv => {
        await argv.names.reduce(async (prev, name) => {
            await prev;
            return prepAtlas(name);
        }, Promise.resolve());
    }
    )
    .command('make <name> <id>', 'fetch and prep files for an emoji', yargs => {
        return yargs
            .positional('name', {
                describe: 'human-readable emoji name'
            })
            .positional('id', {
                describe: 'unicode id; multiple codepoints dash-separated'
            });
    }, argv => {
        addAndPrep(argv.id, argv.name);
        makeConfig(argv.id, argv.name);
    }
    )
    .command('parts <name>', 'add parts to an emoji', yargs => {
        return yargs
            .positional('name', {
                describe: 'human-readable emoji name'
            });
    }, argv => {
        promptForParts(argv.name)
    }
    ).command('combine <name> <layers...>', 'recombine split paths', yargs => {
        return yargs
            .positional('name', {
                describe: 'human-readable emoji name'
            })
            .positional('layers', {
                describe: 'layers to recombine, as named in the atlas',
            });
    }, async argv => {
        const path = svgPath(argv.name);
        const svg = readFileSync(path).toString();
        const newSvg = await combinePaths(svg, ...argv.layers);
        writeFileSync(path, newSvg);
        prepAtlas(argv.name);
    }
    ).parse();
