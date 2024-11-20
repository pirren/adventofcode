import { parseNumbers, parseGearSymbols } from './parse.js'

export const metadata = {
    "Puzzle Name": "Gear Ratios"
}

export default function solution (input) {
    const numbers = input.map(parseNumbers).filter(x => x.length > 0).flat()
    const gearSymbols = input.map(parseGearSymbols).filter(x => x.length > 0).flat()

    return gearSymbols.reduce((sum, {x, y}) => {
        const nums = numbers
            .filter(({x: nx, y: ny, len}) =>  x >= nx - 1 && x <= nx + len && y >= ny - 1 && y <= ny + 1)
            .map(({n}) => n)
        
        return sum + (nums.length === 2 ? nums.at(0) * nums.at(1) : 0)
    }, 0)
}