export const metadata = {
    "Puzzle Name": "Linen Layout"
}

export default function solution (input) {
    const towels = input[0].split(', ')
    const patterns = input.slice(2)
    const memo = new Map()
    
    const numPossiblePatterns = patterns.reduce((count, design) => {
        return count + (analyze(design, towels, memo) !== 0 ? 1 : 0)
    }, 0)

    return numPossiblePatterns
}

export const analyze = (pattern, towels, memo) => {
    if (pattern.length === 0) return 1

    if (memo.has(pattern)) return memo.get(pattern);

    
    let matchedTowels = towels.filter(p => pattern.startsWith(p))
    if (matchedTowels.length === 0) {
        memo.set(pattern, 0)
        return 0
    }

    const possibleCount = matchedTowels.reduce((count, matchedTowel) => {
        const subPattern = pattern.slice(matchedTowel.length)
        return count + analyze(subPattern, towels, memo)   
    }, 0)

    memo.set(pattern, possibleCount)
    return possibleCount
};