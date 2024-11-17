// Description: Tests for Advent of Code 2023 solutions.
import test from '../core/test.js'

describe('advent of code 2023', () => {
    it('day 01, part 1', async function() {
        await test({ year: 2023, day: 1, part: 1, expected: 55029 })
    })
    it('day 01, part 2', async function() {
        await test({ year: 2023, day: 1, part: 2, expected: 55686 })
    })
})