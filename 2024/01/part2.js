import _ from 'lodash'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "Historian Hysteria"
}
    
export default function solution (input) {
    const [left, right] = _.unzip(input.map(ints)).map(
        list => list.sort((a, b) => a - b)
    )
    const frequencyMap = right.reduce((map, loc) => (map[loc] = (map[loc] || 0) + 1, map), {})
    return _.sum(left.map(locA => locA * (frequencyMap[locA] || 0)))
}
