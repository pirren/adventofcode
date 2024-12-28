import { pipe, sum } from '../../lib/utils.js';
import { parseMap, traverse } from './part1.js'

export const metadata = {
    "Puzzle Name": "Hoof It"
};

export default pipe(
    parseMap,
    map => traverse(map, { revisit: true }),
    sum
);