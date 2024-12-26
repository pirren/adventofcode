import { pipe } from '../../lib/utils.js'
import { parseMap, walk, validCheats } from './part1.js'

export const metadata = {
    "Puzzle Name": "Race Condition"
};

export default pipe(
    parseMap,
    walk,
    validCheats(20, 100)
);