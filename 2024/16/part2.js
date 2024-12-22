import _ from 'lodash'
import { createMap, neighbors } from '../../lib/map.js'
import { Heap } from 'heap-js'

export const metadata = {
    "Puzzle Name": "Reindeer Maze"
}

export default function solution (input) {
    let map = createMap(input)
    let start = getPositionOf(input, 'S')
    return traverse(map, start)
}

function getPositionOf(input, searchValue) {
    let [width, height] = [input[0].length, input.length]

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (input[y][x] === searchValue)
                return [x, y];
        }
    }
    return null
}

export function traverse(map, start) {
    const queue = new Heap((a, b) => a[0] - b[0]) // Using heap-js changed runtime from 40s to 8s
    queue.push([0, start, [1,0], [start]])
    
    let visited = {}
    let minScore = Infinity
    let paths = []

    const notReverse = (a, b) => a[0] !== -b[0] || a[1] !== -b[1]

    const candidates = (node) => neighbors(node)
        .filter((node) => map.get(node) !== undefined && map.get(node) !== '#')
        .filter(notReverse);
        
    const calculateCost = (currentDirection, newDirection) => currentDirection.toString() == newDirection ? 1 : 1001

    while (queue.length) {
        let [score, currentPos, currentDirection, path] = queue.pop()
        let [x, y] = currentPos
        const key = [x, y, currentDirection].toString()

        if (map.get(currentPos) === 'E') {
            if (score < minScore) {
                paths = [path]
                minScore = score
            }
            if (score === minScore) paths.push(path)
            continue
        }

        if (!(key in visited)) visited[key] = Infinity
        if (visited[key] < score) continue
        visited[key] = score
        if (score > minScore) continue

        for(const node of candidates(currentPos))
        {
            const newDirection = [node[0] - currentPos[0], node[1] - currentPos[1]]
            const cost = calculateCost(currentDirection, newDirection)

            queue.push([score + cost, node, newDirection, [node, ...path]])
        }
    }

    const pathTiles = new Set();
    paths.forEach(path => path.forEach(tile => pathTiles.add(tile.toString())))

    return pathTiles.size
}