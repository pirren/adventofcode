import { pipe } from '../../lib/utils.js'
import { parse } from './part1.js'

export const metadata = {
    "Puzzle Name": "Ceres Search"
};

const search = map => {
    const LETTERS = ['A', 'M', 'S'];
    const dirs = [
        [1, 1], [-1, -1], [1, -1], [-1, 1]
    ];

    const inBounds = (y, x) =>
        y >= 0 && y < map.length && x >= 0 && x < map[0].length;

    const isXmas = (y, x) =>
        dirs.filter(([dy, dx]) => {
            const y1 = y + dy, x1 = x + dx;
            const y2 = y - dy, x2 = x - dx;
            return (
                inBounds(y1, x1) &&
                inBounds(y2, x2) &&
                map[y1][x1] === LETTERS[1] &&
                map[y2][x2] === LETTERS[2]
            );
        }).length === 2;

    const matches = map.flatMap((row, y) =>
        row.flatMap((cell, x) =>
            y > 0 && y < map.length - 1 &&
            x > 0 && x < row.length - 1 &&
            cell === LETTERS[0] &&
            isXmas(y, x)
                ? 1
                : []
        )
    );

    return matches.length;
};

export default pipe(
    parse,
    search
);
