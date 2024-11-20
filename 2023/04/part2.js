import _ from 'lodash'

export const metadata = {
    "Puzzle Name": "Scratchcards"
}

export default function solution (input) {
    const cardBank = Array.from({ length: input.length }, () => 1);
    
    let cards = input.map((c, card) => {
        const [winningNumbers, myNumbers] = c
            .split(': ').at(-1)
            .split(' | ')
            .map(numbers => numbers.split(' ').map(Number).filter(Boolean));

        return { card, winners: _.intersection(winningNumbers, myNumbers) };
    });

    cards.forEach(({ card, winners }) => {
        for (let i = card + 1; i <= card + winners.length; i++) {
            cardBank[i] += cardBank[card]
        }
    });

    return cardBank.reduce((sum, amount) => sum + amount, 0);
}