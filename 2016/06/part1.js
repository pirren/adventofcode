import _ from 'lodash'
import decode from './decode.js'

export default function solution (input) {
    return decode(input, (map, a, b) => map[a] > map[b]);
} 
