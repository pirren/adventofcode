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

// function walk(start, goal, bytes, size) {
//     let q = [[start, 0, [start].toString()]]
//     let visited = new Set([[start].toString()])

//     const blocked = (bytes, x, y) => bytes.some(([bx, by]) => bx == x && by == y)   
//     const candidates = (node) => neighbors(node)
//         .filter(
//             ([x, y]) => 
//                 x >= 0 && 
//                 x < size && 
//                 y >= 0 
//                 && y < size 
//                 && !blocked(bytes, x, y)
//         );

//     while(q.length) {
//         let [cNode, cSteps, path] = q.shift()
//         let [x, y] = cNode

//         if (x == goal[0] && y == goal[1]) {
//             return path
//         }

//         for (let node of candidates(cNode)) {
//             if (visited.has(node.toString())) 
//                 continue
            
//             let steps = cSteps + 1

//             q.push([node, steps, [...path, node.toString()]])
//             visited.add(node.toString())
//         }
//     }

//     return false
// }
