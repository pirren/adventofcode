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
    let stack = [{ subtotal: numbers.at(0), index: 1 }]

    while(stack.length) {
        let { subtotal, index } = stack.pop()
        if (subtotal > target) continue
        
        if (index == numbers.length) {
            if (subtotal == target) return target
            continue
        }

        let next = numbers[index]
        for (const op of Object.keys(operations)) {
            let newSubTotal = operations[op](subtotal, next) 
            stack.push({ subtotal: newSubTotal, index: index + 1 })
        }
    }

    return false;
};

export default pipe( 
    parseEquations,
    filter(calibrate),
    sum
);
