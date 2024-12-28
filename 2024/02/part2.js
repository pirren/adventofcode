import { pipe } from '../../lib/utils.js'
import { sorted, parse, asc, desc } from './part1.js'

export const metadata = {
    "Puzzle Name": "Red-Nosed Reports"
}

const analyze = reports =>
    reports.reduce(
        (safe, report) => {
            for (let i = 0; i <= report.length - 1; i++) {
                let copy = report.slice();
                copy.splice(i, 1);
                if (sorted(copy, asc) || sorted(copy, desc)) {
                    return safe + 1;
                }
            }
            return safe + (asc(report) || desc(report));
        }, 
        0
    );

export default pipe(
    parse,
    analyze
);