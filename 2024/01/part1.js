import _ from 'lodash'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "Historian Hysteria"
}
    
export default function solution (input) {
    const [left, right] = _.unzip(input.map(ints)).map(
        list => list.sort((a, b) => a - b)
    )
    return _.sum(left.map((locA, i) => Math.abs(locA - right[i])))
}