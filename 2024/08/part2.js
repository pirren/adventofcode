import { pipe } from '../../lib/utils.js';
import { parseMap } from './part1.js';

export const metadata = {
    "Puzzle Name": "Resonant Collinearity"
}

const projections = ([x1, y1], [x2, y2]) => {
    const [dx, dy] = [x2 - x1, y2 - y1];
    return [
        [x2 + dx, y2 + dy, dx, dy], 
        [x1 - dx, y1 - dy, -dx, -dy]
    ];
};

const findAntinodes = ([map, xlen, ylen]) => {
    const inBounds = ([x, y]) => 
        x >= 0 && x < xlen && y >= 0 && y < ylen;

    const antinodes = new Set();
    for (const points of Object.values(map)) {
        const n = points.length;
        for (let i = 0; i < n - 1; i++) {
            const [x1, y1] = points[i];
            antinodes.add(points[i].toString());
    
            for (let j = i + 1; j < n; j++) {
                const [x2, y2] = points[j];
                antinodes.add(points[j].toString());
                
                const queue = projections([x1, y1], [x2, y2]);

                while (queue.length) {
                    const [x, y, cdx, cdy] = queue.shift();
                    if (!inBounds([x, y])) continue;

                    antinodes.add([x, y].toString());
                    queue.push([x + cdx, y + cdy, cdx, cdy]);
                }
            }
        }
    }

    return antinodes
}

export default pipe(
    parseMap,
    findAntinodes,
    antinodes => antinodes.size
);