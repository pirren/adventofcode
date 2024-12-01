import _ from 'lodash'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "Scratchcards"
}

export default function solution (input) {
    return input.map(c => {
        const [winningNumbers, myNumbers] = c
            .split(': ').at(-1)
            .split(' | ')
            .map(ints);

        return _.intersection(winningNumbers, myNumbers);
    }).reduce((totalPoints, winners) => {
        return totalPoints + winners.reduce((acc, _) => acc === 0 ? 1 : acc << 1, 0)
    }, 0)
}