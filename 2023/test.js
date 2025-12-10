// Description: Tests for Advent of Code 2023 solutions.
import aocTest from '../core/test.js'

describe('advent of code 2023', () => {
    it('day 01, part 1', async function() {
        await aocTest({ context: this, year: 2023, day: 1, part: 1, expected: 55029 })
    })
    it('day 01, part 2', async function() {
        await aocTest({ context: this, year: 2023, day: 1, part: 2, expected: 55686 })
    })
    it('day 02, part 1', async function() {
        await aocTest({ context: this, year: 2023, day: 2, part: 1, expected: 2105 })
    })
    it('day 02, part 2', async function() {
        await aocTest({ context: this, year: 2023, day: 2, part: 2, expected: 72422 })
    })
    it('day 03, part 1', async function() {
        await aocTest({ context: this, year: 2023, day: 3, part: 1, expected: 529618 })
    })
    it('day 03, part 2', async function() {
        await aocTest({ context: this, year: 2023, day: 3, part: 2, expected: 77509019 })
    })
    it('day 04, part 1', async function() {
        await aocTest({ context: this, year: 2023, day: 4, part: 1, expected: 17782 })
    })
    it('day 04, part 2', async function() {
        await aocTest({ context: this, year: 2023, day: 4, part: 2, expected: 8477787 })
    })
    it('day 05, part 1', async function() {
        await aocTest({ context: this, year: 2023, day: 5, part: 1, expected: 196167384 })
    })
    it('day 05, part 2', async function() {
        await aocTest({ context: this, year: 2023, day: 5, part: 2, expected: 125742456 })
    })
})