import alignsAt from './alignment.js'

export const metadata = {
    "Puzzle Name": "Timing is Everything"
}

export default function solution (input) {
    return alignsAt(input, { positions: 11, start: 0 })
}
