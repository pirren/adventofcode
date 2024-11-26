// Description: Tests for Advent of Code 2017 solutions.
import test from '../core/test.js'

describe('advent of code 2017', () => {
    it('day 01, part 1', async function() {
        await test({ year: 2017, day: 1, part: 1, expected: 997 })
    })
    it('day 01, part 2', async function() {
        await test({ year: 2017, day: 1, part: 2, expected: 1358 })
    })
    it('day 02, part 1', async function() {
        await test({ year: 2017, day: 2, part: 1, expected: 54426 })
    })
    it('day 02, part 2', async function() {
        await test({ year: 2017, day: 2, part: 2, expected: 333 })
    })
})