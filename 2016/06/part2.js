import _ from 'lodash'
import decode from './decode.js'

export const metadata = {
    "Puzzle Name": "Signals and Noise"
}

export default function solution (input) {
    return decode(input, (map, a, b) => map[a] < map[b]);
} 
