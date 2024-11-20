import _ from 'lodash'

export const metadata = {
    "Puzzle Name": "Scratchcards"
}

export default function solution (input) {
    return input.map(c => {
        const [winningNumbers, myNumbers] = c
            .split(': ').at(-1)
            .split(' | ')
            .map(numbers => numbers.split(' ').map(Number).filter(Boolean));

        return _.intersection(winningNumbers, myNumbers);
    }).reduce((totalPoints, winners) => {
        return totalPoints + winners.reduce((acc, _) => acc === 0 ? 1 : acc << 1, 0)
    }, 0)
}