import { JSDOM } from 'jsdom';
import cfg from '../config.json' assert { type: 'json' };
import Canvas from 'canvas';

const { createCanvas, loadImage } = Canvas;
const dom = new JSDOM();
const { atlasImgSize, atlasFontsize, baseImgSize } = cfg;

globalThis.document = dom.window.document;
globalThis.window = dom.window;

// Require svg now, because it expects the document/window to already exist
const svgdotjs = (await import('@svgdotjs/svg.js')).default;
const { SVG } = svgdotjs;

function prep(svgDocument) {
    return SVG().svg(svgDocument).first();
}

function clean(doc) {
    const output = doc.svg();
    doc.root().remove();
    return output;
}

function splitPaths(svgDocument) {
    const doc = prep(svgDocument);

    const paths = doc.find('path');
    paths.forEach(path => {
        const pathFill = path.attr('fill');
        const commandString = path.array().flat().join(' ');
        const commands = commandString.split(/(?<=Z|z)/);
        commands.forEach(command =>
            doc.path(command.trim())
                .fill(pathFill)
                .insertAfter(path)
        );
        path.remove();
    });

    return clean(doc);
}

function tagElements(svgDocument) {
    const doc = prep(svgDocument);

    const children = doc.children();
    children.forEach((child, index) => {
        child.attr('id', `${index}`.padStart(2, '0'));
    });

    return clean(doc);
}

async function generateAtlas(svgDocument) {
    const doc = prep(svgDocument);

    const children = doc.children().map(child => child.remove());
    const canvas = createCanvas(atlasImgSize * 2, atlasImgSize * children.length);
    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = `bold ${atlasFontsize}px sans-serif`;
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    await children.reduce(async (prev, child, index) => {
        await prev;
        doc.put(child);

        const svgBuf = Buffer.from(doc.svg());
        const img = await loadImage(svgBuf);
        img.width = atlasImgSize;
        img.height = atlasImgSize;
        context.drawImage(img, atlasImgSize, index * atlasImgSize, atlasImgSize, atlasImgSize);
        context.fillText(child.attr('id'), 0.5 * atlasImgSize, (index + 0.5) * atlasImgSize);

        child.remove();
    }, Promise.resolve());

    clean(doc);
    return canvas.toBuffer();
}

async function combinePaths(svgDocument, ...layers) {
    const doc = prep(svgDocument);

    const layerElems = doc.find('path').filter(c => layers.includes(c.attr('id')));

    layerElems.reduce((prev, curr) => {
        const prevComm = prev.attr('d');
        const currComm = curr.attr('d');
        prev.plot(`${prevComm} ${currComm}`);
        curr.remove();
        return prev;
    })

    return clean(doc);
}

async function extractImages(svgDocument, info) {
    const doc = prep(svgDocument);

    const elements = {};
    doc.children().forEach(child => {
        elements[child.attr('id')] = child.remove();
    });

    for (let part in info.parts) {
        for (let layer in info.parts[part]) {
            const ids = info.parts[part][layer];
            const elems = ids.map(id => elements[id]);

            elems.forEach(e => {
                doc.put(e);
            });
            const svgBuf = Buffer.from(doc.svg());
            const img = await loadImage(svgBuf);
            img.width = baseImgSize;
            img.height = baseImgSize;
            info.parts[part][layer] = img;
            doc.children().forEach(child => child.remove());
        }
    }

    clean(doc);
    return info;
}

export { splitPaths, tagElements, generateAtlas, combinePaths, extractImages };