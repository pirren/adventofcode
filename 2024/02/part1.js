import { pipe } from '../../lib/utils.js'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "Red-Nosed Reports"
}

export const sorted = (arr, ordered) => {
    for (let i = 0; i < arr.length - 1; i++) 
        if (!ordered(arr, i) || Math.abs(arr.at(i) - arr.at(i + 1)) > 3) return false;
    return true;
};

export const parse = input => input.map(ints);
export const asc = (arr, i) => arr.at(i) > arr.at(i + 1);
export const desc = (arr, i) => arr.at(i) < arr.at(i + 1);

const analyze = reports => 
    reports.reduce(
        (safe, report) => 
            safe + 1 * (sorted(report, asc) || sorted(report, desc)), 
        0
    );

export default pipe(
    parse,
    analyze
);