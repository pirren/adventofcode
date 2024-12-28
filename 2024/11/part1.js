import { defaultDict } from '../../lib/dict.js'
import { pipe, sum, range } from '../../lib/utils.js'

export const metadata = {
    "Puzzle Name": "Plutonian Pebbles"
};

export const parseStones = (input) =>
    input
        .split(' ')
        .reduce((map, val) => 
            (map[val] = 1, map), defaultDict(() => 0)
        );

const blink = map => {
    for (let [stone, count] of Object.entries(map)) {
        if (count == 0) 
            continue;
        if (stone === '0') {
            map['1'] += count
        }
        else if (stone.length % 2 === 0) {
            let half = stone.length / 2 
            map[Number(stone.slice(0, half)).toString()] += count
            map[Number(stone.slice(half)).toString()] += count
        }
        else {
            map[Number(stone * 2024).toString()] += count
        }
        map[stone] -= count
    }

    return map;
};

export const change = n => map => 
    range(0, n)
        .reduce((m) => blink(m), map);

export default pipe( 
    parseStones,
    change(25),
    m => sum(Object.values(m))
);
