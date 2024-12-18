import _ from 'lodash'
import { ints } from '../../lib/parsing.js'
import { createMap, neighbors } from '../../lib/map.js'

export const metadata = {
    "Puzzle Name": "Reindeer Maze"
}

export default function solution (input) {
    // let [width, height] = [input[0].length, input.length]
    let map = createMap(input)
    let start = getPositionOf(input, 'S')
    let end = getPositionOf(input, 'E')
    // printMap(map, width, height);
    const [score] = traverse(map, start) // dijkstra
    return 12345
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
    let queue = [[0, start, [1,0], [start]]]
    let visited = new Set([start.toString()])
    let seen = new Set()


    const candidates = (node) => neighbors(node)
        .filter((node) => map.get(node) !== undefined && map.get(node) !== '#');
        
    const calculateCost = (currentDirection, newDirection) => {
        return currentDirection.toString() == newDirection ? 1 : 1001
    }

    while (queue.length) {
        let [currentScore, currentPos, currentDirection, path] = queue.shift()

        if (map.get(currentPos) === 'E') {
            return [currentScore]
        }

        for(const node of candidates(currentPos))
        {
            if(!visited.has(node.toString()))
            {
                const newDirection = [node[0] - currentPos[0], node[1] - currentPos[1]]
                const addedScore = calculateCost(currentDirection, newDirection)

                visited.add(node.toString())
                const newPath = path.slice()
                newPath.push(node)

                queue.push([currentScore + addedScore, node, newDirection, newPath])
                queue.sort((a, b) => a[0] - b[0])
            }
        }
    }
}