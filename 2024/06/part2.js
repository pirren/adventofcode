import { pipe } from '../../lib/utils.js'
import { ints } from '../../lib/parsing.js'
import { walk, parseLayout, start } from './part1.js'

export const metadata = {
    "Puzzle Name": "Guard Gallivant"
};

const validObstructions = map => {
    const startPosition = start(map);
    const seen = Array.from(walk(map, startPosition)[0], ints);

    return seen.slice(1).reduce(
        (valid, position) => {
            map[position[1]][position[0]] = '#';
            const result = walk(map, startPosition).at(1);
            map[position[1]][position[0]] = '.';

            return valid + result;
        }, 
        0
    );
};

export default pipe(
    parseLayout,
    validObstructions,
);
