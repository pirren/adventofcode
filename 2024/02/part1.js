import { pipe } from '../../lib/utils.js'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "Red-Nosed Reports"
}

export const sorted = (arr, orderFunc) => 
    arr
        .slice(0, arr.length - 1)
        .every((_, i) => orderFunc(arr, i) && Math.abs(arr.at(i) - arr.at(i + 1)) <= 3);

export const parse = input => input.map(ints);
export const asc = report => sorted(report, (report, i) => report.at(i) > report.at(i + 1));
export const desc = report => sorted(report, (report, i) => report.at(i) < report.at(i + 1));

const analyze = reports => 
    reports.reduce(
        (safe, report) => 
            safe + 1 * (asc(report) || desc(report)), 
        0
    );

export default pipe(
    parse,
    analyze
);