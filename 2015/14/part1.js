import { fly, parse } from './fly.js'

export default function solution (input) {
    return input.map(parse)
        .map(x => fly({ time: 2503, contestant: x }))
        .reduce((max, { distance }) => Math.max(max, distance), 0);
}