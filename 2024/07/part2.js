import { ints } from '../../lib/parsing.js'
import { pipe, sum } from '../../lib/utils.js'

export const metadata = {
    "Puzzle Name": "Bridge Repair"
};

const parseEquations = (input) => 
    input.map(equation => {
        const [target, ...numbers] = ints(equation)
        return { target, numbers }
    });

const operations = {
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
    '||': (a, b) => {
        const digits = Math.floor(Math.log10(b)) + 1; // Number of digits in b
        return a * 10 ** digits + b;
    }
};

const filter = (fn) => (input) => input.map(v => fn(v)).filter(Boolean);

const calibrate = ({ target, numbers }) => {
    const exec = ({ subtotal, index }) => {
        if (subtotal > target) return false; // Overshoot
        if (index === numbers.length) return subtotal === target ? target : false; 

        const next = numbers[index];

        return Object.keys(operations)
            .map(op => operations[op](subtotal, next))
            .map(newSubtotal => exec({ subtotal: newSubtotal, index: index + 1 }))
            .find(result => result !== false) || false; // Return the first valid result or false
    };

    return exec({ subtotal: numbers.at(0), index: 1 });
};

export default pipe( 
    parseEquations,
    filter(calibrate),
    sum
);
