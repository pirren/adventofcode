import _ from 'lodash'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "Mull It Over"
}

export default function solution (input) {
    return _.sum(input.join().match(/mul\((\d+),(\d+)\)/g).map(ints).map(([a, b]) => a * b))
}