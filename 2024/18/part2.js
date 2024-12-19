import { ints } from '../../lib/parsing.js'
import { walk } from './part1.js'

export const metadata = {
    "Puzzle Name": "RAM Run"
}

export default function solution (input) {
    const allBytes = input.map(ints)
    const size = 71
    let bytes = allBytes.slice(0, 1024)
    
    while (true) {
        let path = walk([0,0], [70, 70], bytes, size)
        if (!path)
            break;

        let next;
        do {
            next = allBytes.shift()
            bytes.push(next)
        } while(!path.includes(next.toString()))

        bytes.push(next)
    }

    return bytes.pop().toString()
}
