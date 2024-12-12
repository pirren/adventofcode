import { getInitialLine, blink } from './part1.js';

export const metadata = {
    "Puzzle Name": "Plutonian Pebbles"
}

export default function solution (input) {
    let stones = getInitialLine(input); 
    blink(stones, 75);
    return Object.values(stones).reduce((acc, val) => acc + val, 0);
}