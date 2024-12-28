import { parseStones, change } from './part1.js';
import { pipe, sum } from '../../lib/utils.js';

export const metadata = {
    "Puzzle Name": "Plutonian Pebbles"
};

export default pipe(    
    parseStones,
    change(75),
    m => sum(Object.values(m))
);