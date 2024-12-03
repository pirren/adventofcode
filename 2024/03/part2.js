import _ from 'lodash'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "Mull It Over"
}

export default function solution (input) {
    return parse(input.join()).reduce(
        ({ ok, sum }, line) => {
            const actions = {
                "do": () => ({ ok: true, sum }),
                "don't": () => ({ ok: false, sum }),
                "default": ([a, b]) => ok ? ({ ok, sum: sum + a * b }) : { ok, sum }
            };
            return (actions[line] || actions["default"])(ints(line));
        }, 
        { ok: true, sum: 0 }
    ).sum;
}

function parse(input) {
    return input.match(/(don't|do)(?=\(\))|mul\(\d+,\d+\)/g);
}
