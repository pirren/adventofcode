// Description: Tests for Advent of Code 2025 solutions.
import test from '../core/test.js'

describe('advent of code 2025', () => {
    it('day 01, part 1', async function() {
        await test({ year: 2025, day: 1, part: 1, expected: 1120 })
    })
    it('day 01, part 2', async function() {
        await test({ year: 2025, day: 1, part: 2, expected: undefined })
    })
    it('day 02, part 1', async function() {
        await test({ year: 2025, day: 2, part: 1, expected: 44487518055 })
    })
    it('day 02, part 2', async function() {
        await test({ year: 2025, day: 2, part: 2, expected: 53481866137 })
    })
})