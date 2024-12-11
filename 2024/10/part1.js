import _ from 'lodash'
import { createMap } from '../../lib/map.js'

export const metadata = {
    "Puzzle Name": "Hoof It"
}

export default function solution (input) {
    let [map] = createMap(input, Number);

    return startPositions(input).reduce((sum, start) => sum + traverse(map, start), 0);
}

export function startPositions(input) {
    let starts = [];
    for (const [y, row] of input.entries()) {
        for (const [x, token] of row.split('').entries()) {
            if (token === '0') {
                starts.push([x, y]);
            }
        }
    }
    return starts;
}

export function traverse(map, start, { revisitNodes = false } = {}) {
    let queue = [[start, 0, 0]]
    let visited = new Set([start.toString()])
    let ends = 0

    const neighbors = ([x, y], cheight) => {
        return [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1]
        ]
        .filter((node) => {
            let height = map.get(node)
            return height !== undefined && map.get(node) - cheight == 1
        });
    }
    
    while (queue.length) {
        let [current, currentHeight] = queue.shift()

        if (map.get(current) === 9) {
            ends++
        }

        for(const neighbor of neighbors(current, currentHeight))
        {
            if (!revisitNodes && visited.has(neighbor.toString())) 
                continue
            
            visited.add(neighbor.toString())
            queue.push([neighbor, currentHeight + 1])
        }
    }
    return ends
}