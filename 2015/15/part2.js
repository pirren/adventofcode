import scoreRecipes from './scoreRecipes.js'

export const metadata = {
    "Puzzle Name": "Science for Hungry People"
}

export default function solution (input) {
    return scoreRecipes(input, { countCalories: true });
}