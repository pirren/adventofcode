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
        const numPoints = points.length;

        for (let i = 0; i < numPoints - 1; i++) {
            const [x1, y1] = points[i];
            antinodes.add(points[i].toString());
    
            for (let j = i + 1; j < numPoints; j++) {
                const [x2, y2] = points[j];
                antinodes.add(points[j].toString());

                const [dx, dy] = [x2 - x1, y2 - y1]; 
                const queue = [
                    [x2 + dx, y2 + dy, dx, dy], 
                    [x1 - dx, y1 - dy, -dx, -dy]
                ];

                while (queue.length) {
                    const [x, y, cdx, cdy] = queue.shift();
                    if (!withinBounds([x, y])) 
                        continue;
                    antinodes.add([x, y].toString());
                    queue.push([x + cdx, y + cdy, cdx, cdy]);
                }
            }
        }
    }

    return antinodes.size
}
