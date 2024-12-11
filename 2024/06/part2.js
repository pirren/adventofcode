import { walk, findStart } from './part1.js'
import { createMap } from '../../lib/map.js'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "Guard Gallivant"
}

export default function solution (input) {
    let map = createMap(input);
    let start = findStart(input);
    let dir = [0, -1];

    let queue = Array.from(walk({ map, start, dir })[1], ints);

    let count = 0;
    let lastPos = null;

    for (const position of queue) {
        if (lastPos) map.set(lastPos, '.'); 
        map.set(position, '#');

        count += walk({ map, start, dir }).at(0);
        lastPos = position;
    }

    return count;
};
