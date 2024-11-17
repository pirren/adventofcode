import decompress from './decompress.js'

export const metadata = {
    "Puzzle Name": "Explosives in Cyberspace"
}

export default function solution (input) {
    return decompress(input, x => x.length)
}