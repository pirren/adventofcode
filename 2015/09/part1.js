import tsp from './tsp.js'

export default function solution(input) {
    return tsp(input, { target: Infinity, comparer: (current, target) => Math.min(current, target) })
}