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

export const sorted = (update, precedenceMap) => {
    return update.every((page, i) =>
        update.slice(0, i).every((prevPage) => 
            !precedenceMap[page]?.includes(prevPage)
        )
    );
};

const getOrdered = ({ rules, updates }) => 
     updates.filter(update => 
        sorted(update, rules.reduce(
            (map, [first, second]) => ((map[first] = map[first] || []).push(second), map), 
            {}
        )
    ));

const middleValue = update => update.at((update.length - 1) / 2);

export default pipe(
    parse,
    getOrdered,
    c => sum(c.map(middleValue))
);
