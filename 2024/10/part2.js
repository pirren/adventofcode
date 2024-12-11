import _ from 'lodash'
import { createMap } from '../../lib/map.js'
import { traverse, startPositions } from './part1.js'

export const metadata = {
    "Puzzle Name": "Hoof It"
}

export default function solution (input) {
    let map = createMap(input, Number);
    return startPositions(input).reduce((sum, start) => sum + traverse(map, start, { revisitNodes: true }), 0);
}
