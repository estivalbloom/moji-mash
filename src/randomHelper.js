function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        swap(arr, i, j);
    }
}

function uniqueInts(min, max, count) {
    let options = [...Array(max - min)].map((e, i) => min + i);

    shuffle(options);

    return options.slice(0, count);
}

function select(arr, count) {
    const indices = uniqueInts(0, arr.length, count);
    return indices.map(e => arr[e]);
}

export { swap, shuffle, uniqueInts, select };