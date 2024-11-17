import _ from 'lodash'

export const metadata = {
    "Puzzle Name": "Trebuchet?!"
}

export default function solution (input) {
    let numbers = input.map(getNumbers).map(n => n.join('')).map(Number);
    return numbers.reduce((acc, curr) => acc + curr);
}

const getNumbers = (line) => {
    let numbers = line.match(/\d/g);
    return [ numbers.at(0), numbers.at(-1) ];
};