import { ints } from '../../lib/parsing.js'
import { neighbors } from '../../lib/map.js'

export const metadata = {
    "Puzzle Name": "RAM Run"
}

export default function solution (input) {
    const size = 71
    let bytes = input.map(ints).slice(0, 1024)

    // reduce 1 because the start node is included in the path
    return walk([0,0], [70, 70], bytes, size).length - 1 
}

export function walk(start, goal, bytes, size) {
    let q = [[start, [start.toString()]]]
    let visited = new Set([[start].toString()])

    const blocked = (bytes, x, y) => bytes.some(([bx, by]) => bx == x && by == y)   
    const candidates = (node) => neighbors(node)
        .filter(
            ([x, y]) => 
                x >= 0 && 
                x < size && 
                y >= 0 
                && y < size 
                && !blocked(bytes, x, y)
        );

    while(q.length) {
        let [cNode, path] = q.shift()
        let [x, y] = cNode

        if (x == goal[0] && y == goal[1]) {
            return path
        }

        for (let node of candidates(cNode)) {
            if (visited.has(node.toString())) 
                continue

            q.push([node, [...path, node.toString()]])
            visited.add(node.toString())
        }
    }

    return false
}


// const blocked = (bytes, x, y) => bytes.some(([bx, by]) => bx == x && by == y)

// function walk(start, goal, bytes, size) {
//     let q = [[start, 0]] // node, steps
//     let visited = new Set([[start].toString()])

//     while(q.length) {
//         let [cNode, cSteps] = q.shift()
//         let [x, y] = cNode

//         if (x == goal[0] && y == goal[1]) {
//             return cSteps
//         }

//         for (let node of neighbors(cNode)) {
//             if (visited.has(node.toString())) 
//                 continue

//             let [nx, ny] = node

//             if (nx < 0 || nx >= size || ny < 0 || ny >= size || blocked(bytes, nx, ny)) {
//                 continue
//             }
//             let steps = cSteps + 1

//             q.push([node, steps])
//             visited.add(node.toString())
//         }
//     }

//     throw new Error('No path found')
// }