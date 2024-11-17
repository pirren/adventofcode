import tsp from './tsp.js'

export const metadata = {
    "Puzzle Name": "All in a Single Night"
}

export default function solution(input) {
    return tsp(input, { target: Infinity, comparer: (current, target) => Math.min(current, target) })
}