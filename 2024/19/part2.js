import { analyze } from './part1.js'

export const metadata = {
    "Puzzle Name": "Linen Layout"
}

export default function solution (input) {
    const towels = input[0].split(', ')
    const patterns = input.slice(2)
    const memo = new Map()
    
    const numPossiblePatterns = patterns.reduce((count, design) => {
        return count + analyze(design, towels, memo)
    }, 0)

    return numPossiblePatterns
}
