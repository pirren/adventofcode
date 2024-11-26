import transform from './transform.js'

export const metadata = {
    "Puzzle Name": "If You Give A Seed A Fertilizer"
}

export default function solution (input) {
    return transform(input, { parseSeeds: line => line.match(/([0-9]+)/g).map(Number).map(n => ({ sStart: n, sEnd: n })) })
}
