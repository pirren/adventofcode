import transform from './transform.js'
import _ from 'lodash'

export const metadata = {
    "Puzzle Name": "If You Give A Seed A Fertilizer"
}

export default function solution (input) {
    return transform(input, { 
        parseSeeds: line => _.chunk(line.match(/([0-9]+)/g).map(Number), 2).map(([start, length]) => ({ sStart: start, sEnd: start + length - 1 })) 
    })
}