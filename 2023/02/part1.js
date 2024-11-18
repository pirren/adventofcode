import parseGame from './game.js';

export const metadata = {
    "Puzzle Name": "Cube Conundrum"
}

const cubes = { red: 12, green: 13, blue: 14 };

export default function solution (input) {
    let games = input.map(parseGame);
    return games
        .filter(game => game.red <= cubes.red && game.green <= cubes.green && game.blue <= cubes.blue)
        .reduce((sum, game) => sum + game.id, 0);
}
