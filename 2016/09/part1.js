import _ from 'lodash'
import decompress from './decompress.js'

export default function solution (input) {
    return decompress(input, x => x.length)
}