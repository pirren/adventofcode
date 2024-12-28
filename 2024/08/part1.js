import { pipe } from '../../lib/utils.js';

export const metadata = {
    "Puzzle Name": "Resonant Collinearity"
};

export const parseMap = input => 
    [
        input.reduce((acc, row, i) => {
            row.split('').forEach((token, j) => {
                if (token !== '.') {
                    acc[token] = acc[token] || [];
                    acc[token].push([j, i]);
                }
            });
            return acc;
        }, {}),
        input.at(0).length,
        input.length
    ];

const projections = ([x1, y1], [x2, y2]) => {
    const [dx, dy] = [x2 - x1, y2 - y1];
    return [
        [x2 + dx, y2 + dy], 
        [x1 - dx, y1 - dy]
    ];
};

const findAntinodes = ([map, xlen, ylen]) => {
    const inBounds = ([x, y]) => 
        x >= 0 && x < xlen && y >= 0 && y < ylen;

    const antinodes = new Set();

    for (const points of Object.values(map)) {
        const n = points.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                projections(points[i], points[j])
                    .filter(inBounds)
                    .forEach(node => antinodes.add(node.toString()));
            }
        }
    }

    return antinodes
};

export default pipe(
    parseMap,
    findAntinodes,
    antinodes => antinodes.size
);