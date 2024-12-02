import { ints } from '../../lib/parsing.js'
import sorted from './sorted.js'

export const metadata = {
    "Puzzle Name": "Red-Nosed Reports"
}

export default function solution (input) {
    const asc = (arr, i) => arr.at(i) > arr.at(i + 1)
    const desc = (arr, i) => arr.at(i) < arr.at(i + 1)
    return input.map(ints).reduce((safe, report) => {
        return safe + 1 * (sorted(report, asc) || sorted(report, desc))
    }, 0)

}