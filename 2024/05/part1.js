import { ints } from '../../lib/parsing.js'
import { pipe, sum } from '../../lib/utils.js'

export const metadata = {
    "Puzzle Name": "Print Queue"
};

export const parse = input => {
    const parts = input
        .join('\n')
        .split('\n\n');

    const rules = parts[0].split('\n').map(ints);
    const updates = parts[1].split('\n').map(ints);

    return { rules, updates };
};

export const sorted = (update, map) =>
    update.every((page, i) => update.slice(0, i).every(p => !map[page]?.includes(p)));

const getOrdered = ({ rules, updates }) => {
    const precedenceMap = rules.reduce(
        (map, [first, second]) => ((map[first] = map[first] || []).push(second), map), 
        {}
    );

    const orderedUpdates = updates.filter(update => sorted(update, precedenceMap));

    return orderedUpdates.map(update => update.at((update.length - 1) / 2));
};

export default pipe(
    parse,
    getOrdered,
    sum
);
