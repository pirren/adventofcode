import { ints } from '../../lib/parsing.js'
import { pipe } from '../../lib/utils.js'

export const metadata = {
    "Puzzle Name": "Mull It Over"
}
const parse = input => 
    input.join().match(/(don't|do)(?=\(\))|mul\(\d+,\d+\)/g);

const process = input =>
    input.reduce(
        ({ valid, sum }, line) => {
            const actions = {
                'do': () => ({ valid: true, sum }),
                'don\'t': () => ({ valid: false, sum }),
                'default': ([a, b]) => valid ? ({ valid, sum: sum + a * b }) : { valid, sum }
            };
            return (actions[line] || actions["default"])(ints(line));
        }, 
        { valid: true, sum: 0 }
    ).sum;

export default pipe(
    parse, 
    process
);