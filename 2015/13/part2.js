import arrange from './arrange.js'

export const metadata = {
    "Puzzle Name": "Knights of the Dinner Table"
}

export default function solution (input) {
    return arrange(input, { addSelf: true })
}