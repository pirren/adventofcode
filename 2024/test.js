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
    it('day 05, part 1', async function() {
        await test({ year: 2024, day: 5, part: 1, expected: 4872 })
    })
    it('day 05, part 2', async function() {
        await test({ year: 2024, day: 5, part: 2, expected: 5564 })
    })
    it('day 06, part 1', async function() {
        await test({ year: 2024, day: 6, part: 1, expected: 5145 })
    })
    it('day 06, part 2', async function() {
        await test({ year: 2024, day: 6, part: 2, expected: 1523 })
    })
    it('day 07, part 1', async function() {
        await test({ year: 2024, day: 7, part: 1, expected: 2941973819040 })
    })
    it('day 07, part 2', async function() {
        await test({ year: 2024, day: 7, part: 2, expected: 249943041417600 })
    })
    it('day 08, part 1', async function() {
        await test({ year: 2024, day: 8, part: 1, expected: 259 })
    })
    it('day 08, part 2', async function() {
        await test({ year: 2024, day: 8, part: 2, expected: 927 })
    })
    it('day 09, part 1', async function() {
        await test({ year: 2024, day: 9, part: 1, expected: 6353658451014 })
    })
    it('day 09, part 2', async function() {
        await test({ year: 2024, day: 9, part: 2, expected: 6382582136592 })
    })
    it('day 10, part 1', async function() {
        await test({ year: 2024, day: 10, part: 1, expected: 822 })
    })
    it('day 10, part 2', async function() {
        await test({ year: 2024, day: 10, part: 2, expected: 1801 })
    })
    it('day 11, part 1', async function() {
        await test({ year: 2024, day: 11, part: 1, expected: 235850 })
    })
    it('day 11, part 2', async function() {
        await test({ year: 2024, day: 11, part: 2, expected: 279903140844645 })
    })
    it('day 12, part 1', async function() {
        await test({ year: 2024, day: 12, part: 1, expected: 1361494 })
    })
    it('day 12, part 2', async function() {
        await test({ year: 2024, day: 12, part: 2, expected: 830516 })
    })
})