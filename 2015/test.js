// Description: Tests for Advent of Code 2015 solutions.
import test from '../core/test.js'

describe('advent of code 2015', () => {
    it('day 01, part 1', async function() { 
        await test({ year: 2015, day: 1, part: 1, expected: 280 }) 
    })
    it('day 01, part 1', async function() { 
        await test({ year: 2015, day: 1, part: 2, expected: 1797 }) 
    })
    it('day 02, part 1', async function() {
        await test({ year: 2015, day: 2, part: 1, expected: 1586300 })
    })
    it('day 02, part 2', async function() {
        await test({ year: 2015, day: 2, part: 2, expected: 3737498 })
    })
    it('day 03, part 1', async function() {
        await test({ year: 2015, day: 3, part: 1, expected: 2565 })
    })
    it('day 03, part 2', async function() {
        await test({ year: 2015, day: 3, part: 2, expected: 2639 })
    })
    it('day 04, part 1', async function() {
        await test({ year: 2015, day: 4, part: 1, expected: 117946 })
    })
    it('day 04, part 2', async function() {
        await test({ year: 2015, day: 4, part: 2, expected: 3938038 })
    })
    it('day 05, part 1', async function() {
        await test({ year: 2015, day: 5, part: 1, expected: 255 })
    })
    it('day 05, part 2', async function() {
        await test({ year: 2015, day: 5, part: 2, expected: 55 })
    })
    it('day 06, part 1', async function() {
        await test({ year: 2015, day: 6, part: 1, expected: 377891 })
    })
    it('day 06, part 2', async function() {
        await test({ year: 2015, day: 6, part: 2, expected: 14110788 })
    })
    it('day 07, part 1', async function() {
        await test({ year: 2015, day: 7, part: 1, expected: 16076 })
    })
    it('day 07, part 2', async function() {
        await test({ year: 2015, day: 7, part: 2, expected: 2797 })
    })
    it('day 08, part 1', async function() {
        await test({ year: 2015, day: 8, part: 1, expected: 1333 })
    })
    it('day 08, part 2', async function() {
        await test({ year: 2015, day: 8, part: 2, expected: 2046 })
    })
    it('day 09, part 1', async function() {
        await test({ year: 2015, day: 9, part: 1, expected: 117 })
    })
    it('day 09, part 2', async function() {
        await test({ year: 2015, day: 9, part: 2, expected: 909 })
    })
    it('day 10, part 1', async function() {
        await test({ year: 2015, day: 10, part: 1, expected: 360154 })
    })
    it('day 10, part 2', async function() {
        await test({ year: 2015, day: 10, part: 2, expected: 5103798 })
    })
    it('day 11, part 1', async function() {
        await test({ year: 2015, day: 11, part: 1, expected: 'cqjxxyzz' })
    })
    it('day 11, part 2', async function() {
        await test({ year: 2015, day: 11, part: 2, expected: 'cqkaabcc' })
    })
    it('day 12, part 1', async function() {
        await test({ year: 2015, day: 12, part: 1, expected: 119433 })
    })
    it('day 12, part 2', async function() {
        await test({ year: 2015, day: 12, part: 2, expected: 68466 })
    })
    it('day 13, part 1', async function() {
        await test({ year: 2015, day: 13, part: 1, expected: 733 })
    })
    it('day 13, part 2', async function() {
        await test({ year: 2015, day: 13, part: 2, expected: 725 })
    })
    it('day 14, part 1', async function() {
        await test({ year: 2015, day: 14, part: 1, expected: 2660 })
    })
    it('day 14, part 2', async function() {
        await test({ year: 2015, day: 14, part: 2, expected: 1256 })
    })
    it('day 15, part 1', async function() {
        await test({ year: 2015, day: 15, part: 1, expected: 21367368 })
    })
    it('day 15, part 2', async function() {
        await test({ year: 2015, day: 15, part: 2, expected: 1766400 })
    })
})