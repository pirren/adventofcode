import { pipe, sum } from '../../lib/utils.js';
import { neighbors } from '../../lib/map.js';

export const metadata = {
    "Puzzle Name": "Hoof It"
};

export const parseMap = input => 
    input.map(row => row.split('').map(Number));

const startPositions = map =>
    map.reduce((acc, row, y) => {
        row.forEach((cell, x) => {
            if (cell === 0) {
                acc.push([x, y]);
            }
        });
        return acc;
    }, []); 

export function traverse(map, { revisit = false } = {}) {
    const candidates = (node, currentHeight) => 
        neighbors(node)
            .filter(([x, y]) => 
                map[y]?.[x] !== undefined && currentHeight + 1 ==  map[y]?.[x]
            );

    const walk = start => {
        let queue = [[start, 0, 0]]
        let visited = new Set([start.toString()])
        let ends = 0
        
        while (queue.length) {
            let [current, currentHeight] = queue.shift();
            const [x, y] = current;

            if (map[y]?.[x] === 9) ends++

            queue.push(
                ...candidates(current, currentHeight)
                .map(neighbor => [neighbor, currentHeight + 1])
                .filter(([neighbor]) => {
                    if (!revisit && visited.has(neighbor.toString())) 
                        return false
                    !revisit && visited.add(neighbor.toString())
                    return true
                })
            );
        }

        return ends;
    };

    return startPositions(map)
        .map(walk);
};

export default pipe(
    parseMap,
    traverse,
    sum
);
