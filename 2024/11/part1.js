import _ from 'lodash'
import { defaultDict } from '../../lib/dict.js'

export const metadata = {
    "Puzzle Name": "Plutonian Pebbles"
}

export default function solution (input) {
    let stones = getInitialLine(input); 
    blink(stones, 25);
    return Object.values(stones).reduce((acc, val) => acc + val, 0);
}

export function getInitialLine(input) {
    let stones = defaultDict(() => 0);
    for (let stone of input.split(' ')) {
        stones[stone] = 1;
    }
    return stones;
}

export function blink(dict, n) {
    for (let {} of _.range(n)) {
        for (let [stone, count] of Object.entries(dict)) {
            if (count == 0) 
                continue;
            if (stone === '0') {
                dict['1'] += count
            }
            else if (stone.length % 2 === 0) {
                let half = stone.length / 2 
                dict[Number(stone.slice(0, half)).toString()] += count
                dict[Number(stone.slice(half)).toString()] += count
            }
            else {
                dict[Number(stone * 2024).toString()] += count
            }
            dict[stone] -= count
        }
    }
}