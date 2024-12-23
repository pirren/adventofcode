import { pipe } from '../../lib/utils.js'

export const metadata = {
    "Puzzle Name": "Guard Gallivant"
};

export const start = map => {
    const sy = map.findIndex(row => row.includes('^'));
    const sx = map[sy].indexOf('^');
    return [sx, sy];
};

export const parseLayout = input => input.map(row => ([...row]));

const nextDirection = (dir) => {
    const directions = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0]
    ];

    const index = directions.findIndex(([dx, dy]) => dx === dir[0] && dy === dir[1]);
    return directions[(index + 1) % directions.length];
};

export const walk = (map, startAt = null) => {
    const stack = [[startAt || start(map), [0, -1]]];
    const tiles = new Set();
    const blocks = new Set();
    
    while (stack.length) {
        let [position, dir] = stack.pop();
        tiles.add(position.toString());

        let NEXT = [position[0] + dir[0], position[1] + dir[1]];

        if (NEXT[0] < 0 || NEXT[0] >= map[0].length || NEXT[1] < 0 || NEXT[1] >= map.length) {
            return [tiles, false];
        }

        let token = map[NEXT[1]][NEXT[0]];

        if (token === '#') {
            let block = [position, dir].toString();
            if (blocks.has(block)) 
                return [null, true];
            blocks.add(block);

            // Update NEXT after turning
            let nd = nextDirection(dir);
            dir = map[position[1] + nd[1]][position[0] + nd[0]] === '#' ? nextDirection(nd) : nd;
            NEXT = [position[0] + dir[0], position[1] + dir[1]];
        }

        stack.push([NEXT, dir]);
    }
};

export default pipe(
    parseLayout,
    walk,
    ([seen]) => seen.size
);
