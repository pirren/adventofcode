import parseGame from './game.js';

export const metadata = {
    "Puzzle Name": "Cube Conundrum"
}

export default function solution (input) {
    let games = input.map(parseGame);
    let powers = Object.entries(games).map(([_, value]) => value.blue * value.green * value.red);
    return powers.reduce((sum, power) => sum + power, 0);
}
