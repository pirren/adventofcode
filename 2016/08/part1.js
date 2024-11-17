import _ from 'lodash'

export const metadata = {
    "Puzzle Name": "Two-Factor Authentication"
}

const power = (display, width, height) => {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            display[y][x] = '#';
        }
    }
    return display;
};

const getDisplay = (rows = 6, columns = 50) => 
    Array.from({ length: rows }, () => Array.from({ length: columns }, () => ' '));

function rotate(axis, amount) {
    let shift = axis.slice(axis.length - amount, axis.length); 
    let rest = axis.slice(0, axis.length - amount);

    return shift.concat(rest);
};

const processMatch = (match, getAxis, rotateAndAssign) => {
    if (!match) return;
    const [_, pos, amount] = parseMatch(match);
    const axis = getAxis(pos);
    const rotated = rotate(axis, amount);
    rotateAndAssign(rotated, pos);
};

const parseMatch = (match) => match.map((item, index) => (index > 0 ? parseInt(item, 10) : item));
const getColumn = (display, x) => display.map(row => row[x]);
const assignColumn = (display, column, x) => column.forEach((value, y) => display[y][x] = value);
const assignRow = (display, row, y) => row.forEach((value, x) => display[y][x] = value);

export default function solution (input) {
    const display = input.reduce((display, line) => {
        let rectMatch = /rect (\d+)x(\d+)$/.exec(line)
        if (rectMatch) {
            const [_, w, h] = rectMatch;
            display = power(display, w, h);
        }
        
        processMatch(
            /rotate column x=(\d+) by (\d+)$/.exec(line),
            x => getColumn(display, x),
            (rotated, x) => assignColumn(display, rotated, x)
        );

        processMatch(
            /rotate row y=(\d+) by (\d+)$/.exec(line),
            y => display[y],
            (rotated, y) => assignRow(display, rotated, y)
        );

        return display;
    }, getDisplay());

    const litPixels = display.flat().filter(x => x == '#').length;
    return litPixels;
}