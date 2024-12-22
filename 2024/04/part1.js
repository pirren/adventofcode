import { pipe, range } from '../../lib/utils.js'

export const metadata = {
    "Puzzle Name": "Ceres Search"
};

export const parse = input => 
    range(0, input.length).map(y => input[y].split(''));

const search = map => {
    const LETTERS = ['X', 'M', 'A', 'S'];
    const dirs = [ 
        [0, 1], [1, 0], [0, -1], [-1, 0], 
        [1, 1], [-1, -1], [1, -1], [-1, 1] 
    ];

    const inBounds = (y, x) => 
        y >= 0 && y < map.length && x >= 0 && x < map[0].length;

    const matchesPattern = (y, x, dy, dx) =>
        LETTERS.slice(1).every((letter, i) => {
            const ny = y + dy * (i + 1);
            const nx = x + dx * (i + 1);
            return inBounds(ny, nx) && map[ny][nx] === letter;
        });

    const matches = map.flatMap((row, y) =>
        row.flatMap((cell, x) =>
            cell === LETTERS[0]
                ? dirs.filter(([dy, dx]) => matchesPattern(y, x, dy, dx))
                : []
        )
    );

    return matches.length;
};

export default pipe(
    parse,
    search
);