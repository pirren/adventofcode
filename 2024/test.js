// Description: Tests for Advent of Code 2024 solutions.
import test from '../core/test.js'

describe('advent of code 2024', () => {
    it('day 01, part 1', async function() {
        await test({ year: 2024, day: 1, part: 1, expected: 765748 })
    })
    it('day 01, part 2', async function() {
        await test({ year: 2024, day: 1, part: 2, expected: 27732508 })
    })
    it('day 02, part 1', async function() {
        await test({ year: 2024, day: 2, part: 1, expected: 564 })
    })
    it('day 02, part 2', async function() {
        await test({ year: 2024, day: 2, part: 2, expected: 604 })
    })
    it('day 03, part 1', async function() {
        await test({ year: 2024, day: 3, part: 1, expected: 173517243 })
    })
    it('day 03, part 2', async function() {
        await test({ year: 2024, day: 3, part: 2, expected: 100450138 })
    })
    it('day 04, part 1', async function() {
        await test({ year: 2024, day: 4, part: 1, expected: 2599 })
    })
    it('day 04, part 2', async function() {
        await test({ year: 2024, day: 4, part: 2, expected: 1948 })
    })
})