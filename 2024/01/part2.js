import { pipe, sum } from '../../lib/utils.js'
import { process, sort } from './part1.js'

export const metadata = {
    "Puzzle Name": "Historian Hysteria"
};

const measure = ([left, right]) => {
    const map = right.reduce((a, x) => (a[x] = (a[x] || 0) + 1, a), {});

    return left.map(locA => locA * (map[locA] || 0));
};

export default pipe(
    process,
    sort,
    measure,
    sum
);