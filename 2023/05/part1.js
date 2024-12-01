import transform from './transform.js'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "If You Give A Seed A Fertilizer"
}

export default function solution (input) {
    return transform(input, { parseSeeds: line => ints(line).map(n => ({ sStart: n, sEnd: n })) })
}
