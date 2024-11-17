import { generatePattern } from './generate-pattern.js'

export const metadata = {
    "Puzzle Name": "Like a Rogue"
}

export default function solution (input) {
    return generatePattern(input, 400000)
}