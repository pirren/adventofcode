import { pipe } from '../../lib/utils.js'

export const metadata = {
    "Puzzle Name": "Race Condition"
};

export const parseMap = input => 
    input.map(row => [...row]);

const getPosition = (map, token) => {
    const ty = map.findIndex(row => row.includes(token));
    const tx = map[ty].indexOf(token);
    return [tx, ty];
};

const neighbors = ([x, y], map) => [
        [x, y - 1],
        [x, y + 1],
        [x - 1, y],
        [x + 1, y]
    ]
    .filter(([nx, ny]) => 
        nx >= 0 && ny >= 0 && nx < map[0].length && ny < map.length
    );

export const walk = map => {
    const start = getPosition(map, 'S');
    const seen = new Set();
    const queue = [[start, [start]]];

    while (queue.length) {
        let [[x, y], path] = queue.shift();
        let token = map[y][x];

        if (token === 'E') return { path, map };

        seen.add(`${x},${y}`);

        queue.push(...neighbors([x, y], map)
            .filter(([nx, ny]) => map[ny][nx] !== '#' && !seen.has(`${nx},${ny}`))
            .map(([nx, ny]) => [[nx, ny], [...path, [nx, ny]]])
        );
    }

    throw new Error('No path found');
};

// Manhattan distance
const tdist = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

export const validCheats = (cheatMaxLength, saveTime) => ({ path }) => {  
    const cheats = ([x1, y1], i) => {
        const foundCheats = [];
        for (let j = i + 1; j < path.length; j++) {
            const [x2, y2] = path[j];
            const pathLen = j - i;
            const manhattan = tdist([x1, y1], [x2, y2]);

            if (pathLen === manhattan || manhattan > cheatMaxLength) continue;

            if (pathLen - manhattan >= saveTime) {
                foundCheats.push(pathLen - manhattan);
            }
        }

        return foundCheats;
    };

    const candidatePositions = path.slice(0, path.length - cheatMaxLength);

    return candidatePositions
        .flatMap(cheats)
        .length;
};

export default pipe(
    parseMap,
    walk,
    validCheats(2, 100)
);