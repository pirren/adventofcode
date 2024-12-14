import _ from 'lodash'
import { createMap, neighbors } from '../../lib/map.js'

export const metadata = {
    "Puzzle Name": "Garden Groups"
}

export default function solution (input) {
    let map = createMap(input)
    let [xlen, ylen] = [input.at(0).length, input.length]

    let regions = []
    let seen = new Set();
    for (let y = 0; y < ylen; y++) {
        for (let x = 0; x < xlen; x++) {
            if (seen.has(`${x},${y}`)) 
                continue;

            let plot = map.get([x, y]);
            let queue = neighbors([x, y]);
            seen.add(`${x},${y}`)

            let region = { type: plot, nodes: [[x,y]], sides: 0 }

            while (queue.length) {
                let [nx, ny] = queue.shift();
                let nplot = map.get([nx, ny]);

                if (nplot === undefined || nplot !== plot || seen.has(`${nx},${ny}`))
                    continue;

                seen.add(`${nx},${ny}`)
                queue.push(...neighbors([nx, ny]))
                region.nodes.push([nx, ny]);
            }
            regions.push(region)
        }
    }

    const isCorner = (type, [x1, y1], [x2, y2]) => {
        let plot1 = map.get([x1, y1]);
        let plot2 = map.get([x2, y2]);
        return plot1 !== type && plot2 !== type;
    }

    const isNegativeCorner = (type, [x1, y1], [x2, y2], [x3, y3]) => {
        let plot1 = map.get([x1, y1]);
        let plot2 = map.get([x2, y2]);
        return plot1 === type && plot2 === type && map.get([x3, y3]) !== type;
    }

    const cornerOffsets = [
        [[-1, 0], [0, -1], [-1, -1]], // Top-left corner
        [[1, 0], [0, -1], [1, -1]],  // Top-right corner
        [[-1, 0], [0, 1], [-1, 1]],  // Bottom-left corner
        [[1, 0], [0, 1], [1, 1]]     // Bottom-right corner
    ];

    for (let region of regions) {
        for (let [x, y] of region.nodes) {
            for (let [corner1, corner2, invertedCorner] of cornerOffsets) {
                const corner1Pos = [x + corner1[0], y + corner1[1]];
                const corner2Pos = [x + corner2[0], y + corner2[1]];
                const invertedPos = [x + invertedCorner[0], y + invertedCorner[1]];

                if (isCorner(region.type, corner1Pos, corner2Pos)) 
                    region.sides++;
                if (isNegativeCorner(region.type, corner1Pos, corner2Pos, invertedPos)) 
                    region.sides++;
            }
        }
    }

    return _.sumBy(regions.map(({nodes, sides}) => nodes.length * sides))
}