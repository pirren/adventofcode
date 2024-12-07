import _ from 'lodash'
import { walk, getMap } from './map.js'

export const metadata = {
    "Puzzle Name": "Guard Gallivant"
}

export default function solution (input) {
    let [map, start] = getMap(input)
    let dir = [0, -1]
    return walk({map, start, dir}).at(1).size
}
