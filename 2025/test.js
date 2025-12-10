// Description: Tests for Advent of Code 2025 solutions.
import aocTest from '../core/test.js'

describe('advent of code 2025', () => {
    it('day 01, part 1', async function() {
        await aocTest({ context: this, year: 2025, day: 1, part: 1, expected: 1120 })
    })
    it('day 01, part 2', async function() {
        await aocTest({ context: this, year: 2025, day: 1, part: 2, expected: undefined })
    })
    it('day 02, part 1', async function() {
        await aocTest({ context: this, year: 2025, day: 2, part: 1, expected: 44487518055 })
    })
    it('day 02, part 2', async function() {
        await aocTest({ context: this, year: 2025, day: 2, part: 2, expected: 53481866137 })
    })
    it('day 03, part 1', async function() {
        await aocTest({ context: this, year: 2025, day: 3, part: 1, expected: 16927 })
    })
    it('day 03, part 2', async function() {
        await aocTest({ context: this, year: 2025, day: 3, part: 2, expected: 167384358365132 })
    })
})