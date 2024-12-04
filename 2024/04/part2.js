import _ from 'lodash'

export const metadata = {
    "Puzzle Name": "Ceres Search"
}

export default function solution (input) {
    const t_letters = ['A', 'M', 'S'];
    const dirs = [ [1, 1], [-1, -1], [1, -1], [-1, 1] ];
    const isXmas = (y, x) => {
        return dirs.filter(([dy, dx]) => {
            const y1 = y + dy, x1 = x + dx;
            const y2 = y - dy, x2 = x - dx;
            return input[y1][x1] === t_letters.at(1) && input[y2][x2] === t_letters.at(2)
        }).length == 2;
    }

    let count = 0;

    for (let y of _.range(1, input.length - 1)) {
        for (let x of _.range(1, input[y].length - 1)) {
            if (input[y][x] === t_letters.at(0) && isXmas(y,x)) {
                count++;
            }
        }
    }

    return count;
}
