import _ from 'lodash'

export const metadata = {
    "Puzzle Name": "Ceres Search"
}

export default function solution (input) {
    const t_letters = ['X', 'M', 'A', 'S'];
    const dirs = [ [0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1] ];
    const inBounds = (y, x) => {
        return y >= 0 && y < input.length && x >= 0 && x < input[0].length;
    } 

    let count = 0;

    for (let y of _.range(input.length)) {
        for (let x of _.range(input[y].length)) {
            if (input[y][x] !== t_letters.at(0)) {
                continue;
            } 
            dirs.forEach(([dy, dx]) => {
                if (t_letters.slice(1).every((letter, i) => {
                    const y1 = y + dy * (i + 1)
                    const x1 = x + dx * (i + 1)
                    return inBounds(y1, x1) && input[y1][x1] === letter
                })) {
                    count++;
                }
            });
        }
    }

    return count;
}
