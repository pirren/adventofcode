import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "Claw Contraption"
}

export default function solution (input) {
    return cheapestPossiblePrizes(input)
}

export function cheapestPossiblePrizes(input, offset = 0) {
    let machines = parseMachines(input, offset)
    return machines.reduce((acc, machine) => {
        let [[ax, ay], [bx, by], [px, py]] = machine;
        
        // Cramer's rule
        let det = ax * by - ay * bx;
        let a = Math.round((px * by - py * bx) / det);
        let b = Math.round((py * ax - px * ay) / det);

        if ((ax * a + bx * b) == px && (ay * a + by * b) == py) {
            acc += a * 3 + b
        }
        return acc
    }, 0);
}

export function parseMachines(input, offset) {
    let queue = input.slice();
    let machines = [];

    while (queue.length) {
        let a = ints(queue.shift());
        let b = ints(queue.shift());
        let prize = ints(queue.shift()).map(x => x + offset);
        machines.push([a, b, prize]);
        queue.shift();
    }

    return machines;
}