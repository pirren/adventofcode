import _ from 'lodash'
import { createMap, neighbors } from '../../lib/map.js'

export const metadata = {
    "Puzzle Name": "Garden Groups"
}

export default function solution (input) {
    let map = createMap(input)
    let [xlen, ylen] = [input.length, input.at(0).length]

    let regions = []
    let seen = new Set();
    for (let y = 0; y < ylen; y++) {
        for (let x = 0; x < xlen; x++) {
            if (seen.has(`${x},${y}`)) 
                continue;

            let plot = map.get([x, y]);
            let queue = neighbors([x, y]);
            seen.add(`${x},${y}`)

            let region = { type: plot, area: 1, perimeter: 0 }

            while (queue.length) {
                let [nx, ny] = queue.shift();
                let nplot = map.get([nx, ny]);

                if (nplot === undefined || nplot !== plot) {
                    region.perimeter++;
                    continue;
                }

                if(seen.has(`${nx},${ny}`)) 
                    continue;

                seen.add(`${nx},${ny}`)
                queue.push(...neighbors([nx, ny]))
                region.area++;
            }
            regions.push(region)
        }
    }

    return _.sumBy(regions.map(({area, perimeter}) => area * perimeter))
}