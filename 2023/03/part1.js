import parseNumbers from './numbers.js'

export const metadata = {
    "Puzzle Name": "Gear Ratios"
}

export default function solution (input) {
    const isValid = (x, y) => y >= 0 && y < input.length && x >= 0 && x < input[0].length && !/(\d|\.)/.test(input[y][x]) 
    
    const numbers = input.map(parseNumbers).filter(x => x.length > 0).flat()

    return (
            numbers.filter(({x, y, len}) => {
            for (let i = y - 1; i <= y + 1; i++) {
                for (let j = x - 1; j <= x + len; j++) {
                    if (isValid(j, i)) return true
                }
            }
        }).reduce((sum, { n }) => sum + n, 0)
    )
}