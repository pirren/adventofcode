import _ from 'lodash'

export const metadata = {
    "Puzzle Name": "Trebuchet?!"
}

export default function solution (input) {
    let numbers = input.map(getNumbers).map(n => n.join('')).map(Number);
    return numbers.reduce((acc, curr) => acc + curr);
}

const letters = {"one": "on1e", "two": "tw2o", "three": "thr3ee", "four": "fo4ur", "five": 
    "fi5ve", "six": "si6x", "seven": "se7ven", "eight": "ei8ght", "nine": "ni9ne" };

const getNumbers = (line) => {
    Object.keys(letters).forEach(key => {
        const value = letters[key];
        line = line.replace(new RegExp(key, 'g'), value);
    });

    let numbers = line.match(/\d/g);
    return [ numbers.at(0), numbers.at(-1) ];
};