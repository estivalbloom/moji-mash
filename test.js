import { init, randomEmoji, list as emojiList } from "./src/makeEmoji.js";
import * as fs from 'fs/promises';

init().then(() => {
    const { canvas, list } = randomEmoji(192);
    console.log(list);
    fs.writeFile('./test.png', canvas.toBuffer());
});