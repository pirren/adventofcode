import { createMap } from '../../lib/map.js'

export const metadata = {
    "Puzzle Name": "Guard Gallivant"
}

export default function solution (input) {
    let map = createMap(input)
    let start = findStart(input)
    let dir = [0, -1]
    return walk({map, start, dir}).at(1).size
}

const nextDirections = new Map([
    [[0, -1].toString(), [1, 0]],
    [[1, 0].toString(), [0, 1]],
    [[0, 1].toString(), [-1, 0]],
    [[-1, 0].toString(), [0, -1]]
]);

const nextDir = (dir) => nextDirections.get(dir.toString());

export function walk({ map = null, start = null, dir = null } = {}) {
    let stack = [[start, dir]];
    let seen = new Set([start.toString()]);
    let seenBlocks = new Set();

    const nextPos = ([x, y], [dx, dy]) => [x + dx, y + dy];

    while (stack.length) {
        let [at, currentDir] = stack.pop();

        let next = nextPos(at, currentDir)
        let next_token = map.get(next);

        if (next_token === '#') {
            let block = [at, currentDir].toString();

            if (seenBlocks.has(block)) 
                return [true, seen];

            seenBlocks.add(block);

            let dirNext = nextDir(currentDir);
            currentDir = map.get(nextPos(at, dirNext)) === '#' ? nextDir(dirNext) : dirNext;
        }

        at = nextPos(at, currentDir)

        if (map.get(at) === undefined) 
            return [false, seen];

        seen.add(at.toString());

        stack.push([at, currentDir]);
    }

    return [false, seen];
};

export function findStart(input) {
    for (const [y, row] of input.entries()) {
        for (const [x, token] of row.split('').entries()) {
            if (token === '^') {
                return [x, y];
            }
        }
    }
}
