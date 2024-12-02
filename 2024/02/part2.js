import { ints } from '../../lib/parsing.js'
import sorted from './sorted.js'

export const metadata = {
    "Puzzle Name": "Red-Nosed Reports"
}

export default function solution (input) {
    const asc = (arr, i) => arr.at(i) > arr.at(i + 1)
    const desc = (arr, i) => arr.at(i) < arr.at(i + 1)
    return input.map(ints).reduce((safe, report) => {
        // Test all sub-arrays(sliced copies) of the report
        for (let i = 0; i <= report.length - 1; i++) {
            let copy = report.slice()
            copy.splice(i, 1)
            if (sorted(copy, asc) || sorted(copy, desc)) {
                return safe + 1
            }
        }
        // We can abuse javascripts type system to add a boolean to a number
        return safe + (sorted(report, asc) || sorted(report, desc))
    }, 0)
}