export const metadata = {
    "Puzzle Name": "Resonant Collinearity"
}

export default function solution (input) {
    const map = input.reduce((acc, row, i) => {
        row.split('').forEach((token, j) => {
            if (token === '.') return
            (acc[token] = acc[token] || []).push([j, i])
        })
        return acc
    }, {});

    const withinBounds = ([x, y]) => x >= 0 && x < input.at(0).length && y >= 0 && y < input.length

    const antinodes = new Set();

    for (const points of Object.values(map)) {
        const n = points.length;
        for (let i = 0; i < n - 1; i++) {
    
            for (let j = i + 1; j < n; j++) {
                const candidates = findAntinodes(points[i], points[j]);

                candidates
                    .filter(withinBounds)
                    .forEach(node => antinodes.add(node.toString()));
            }
        }
    }

    return antinodes.size
}

function findAntinodes([x1, y1], [x2, y2]) {
    const [dx, dy] = [x2 - x1, y2 - y1];
    return [
        [x2 + dx, y2 + dy], 
        [x1 - dx, y1 - dy]
    ];
};