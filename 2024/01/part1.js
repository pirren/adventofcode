import { pipe, sum } from '../../lib/utils.js'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "Historian Hysteria"
};

export const process = input => 
     input.map(ints).reduce(
        ([l, r], [f, s]) => {
            l.push(f);
            r.push(s);
            return [l, r];
        },
        [[], []]
    );

export const sort = ([left, right]) => {
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);
    return [left, right];
};

const measure = ([left, right]) => 
    left.map((x, i) => Math.abs(x - right[i]));
   
export default pipe(
    process,
    sort,
    measure,
    sum
);
