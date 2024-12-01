import transform from './transform.js'
import _ from 'lodash'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "If You Give A Seed A Fertilizer"
}

export default function solution (input) {
    return transform(input, { 
        parseSeeds: line => _.chunk(ints(line), 2).map(([start, length]) => ({ sStart: start, sEnd: start + length - 1 })) 
    })
}