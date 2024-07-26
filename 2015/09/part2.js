import tsp from './tsp.js'

export default function solution (input) {
    return tsp(input, -Infinity, (current, target) => Math.max(current, target))
}