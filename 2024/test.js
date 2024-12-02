// Description: Tests for Advent of Code 2024 solutions.
import test from '../core/test.js'

describe('advent of code 2024', () => {
    it('day 01, part 1', async function() {
        await test({ year: 2024, day: 1, part: 1, expected: 765748 })
    })
    it('day 01, part 2', async function() {
        await test({ year: 2024, day: 1, part: 2, expected: 27732508 })
    })
})