// Description: Tests for Advent of Code 2016 solutions.
import test from '../core/test.js'

describe('advent of code 2016', () => {
    it('day 01, part 1', async function() { 
        await test({ year: 2016, day: 1, part: 1, expected: 271 }) 
    })
    it('day 01, part 2', async function() {
        await test({ year: 2016, day: 1, part: 2, expected: 153 })
    })
    it('day 02, part 1', async function() {
        await test({ year: 2016, day: 2, part: 1, expected: 52981 })
    })
    it('day 02, part 2', async function() {
        await test({ year: 2016, day: 2, part: 2, expected: '74CD2' })
    })
    it('day 03, part 1', async function() {
        await test({ year: 2016, day: 3, part: 1, expected: 862 })
    })
    it('day 03, part 2', async function() {
        await test({ year: 2016, day: 3, part: 2, expected: 1577 })
    })
    it('day 04, part 1', async function() {
        await test({ year: 2016, day: 4, part: 1, expected: 158835 })
    })
    it('day 04, part 2', async function() {
        await test({ year: 2016, day: 4, part: 2, expected: 993 })
    })
    it('day 05, part 1', async function() {
        await test({ year: 2016, day: 5, part: 1, expected: 'c6697b55' })
    })
    it('day 05, part 2', async function() {
        await test({ year: 2016, day: 5, part: 2, expected: '8c35d1ab', context: this, timeout: 120000 })
    })
    it('day 06, part 1', async function() {
        await test({ year: 2016, day: 6, part: 1, expected: 'wkbvmikb' })
    })
    it('day 06, part 2', async function() {
        await test({ year: 2016, day: 6, part: 2, expected: 'evakwaga' })
    })
    it('day 07, part 1', async function() {
        await test({ year: 2016, day: 7, part: 1, expected: 115 })
    })
    it('day 07, part 2', async function() {
        await test({ year: 2016, day: 7, part: 2, expected: 231 })
    })  
    it('day 08, part 1', async function() {
        await test({ year: 2016, day: 8, part: 1, expected: 128 })
    })
    it('day 08, part 2', async function() {
        await test({ year: 2016, day: 8, part: 2, expected: 'EOARGPHYAO' })
    })
    it('day 09, part 1', async function() {
        await test({ year: 2016, day: 9, part: 1, expected: 152851 })
    })
    it('day 09, part 2', async function() {
        await test({ year: 2016, day: 9, part: 2, expected: 11797310782 })
    })
    it('day 10, part 1', async function() {
        await test({ year: 2016, day: 10, part: 1, expected: 118 })
    })
    it('day 10, part 2', async function() {
        await test({ year: 2016, day: 10, part: 2, expected: 143153 })
    })
    it('day 12, part 1', async function() {
        await test({ year: 2016, day: 12, part: 1, expected: 318077 })
    })
    it('day 12, part 2', async function() {
        await test({ year: 2016, day: 12, part: 2, expected: 9227731 })
    })
    it('day 13, part 1', async function() {
        await test({ year: 2016, day: 13, part: 1, expected: 92 })
    })
    it('day 13, part 2', async function() {
        await test({ year: 2016, day: 13, part: 2, expected: 124 })
    })
    it('day 14, part 1', async function() {
        await test({ year: 2016, day: 14, part: 1, expected: 15035 })
    })
    it('day 14, part 2', async function() {
        await test({ year: 2016, day: 14, part: 2, expected: 19968, context: this, timeout: 180000 })
    })
    it('day 15, part 1', async function() {
        await test({ year: 2016, day: 15, part: 1, expected: 122318 })
    })
    it('day 15, part 2', async function() {
        await test({ year: 2016, day: 15, part: 2, expected: 3208583 })
    })
    it('day 16, part 1', async function() {
        await test({ year: 2016, day: 16, part: 1, expected: '10011010010010010' })
    })
    it('day 16, part 2', async function() {
        await test({ year: 2016, day: 16, part: 2, expected: '10101011110100011' })
    })
    it('day 17, part 1', async function() {
        await test({ year: 2016, day: 17, part: 1, expected: 'DRLRDDURDR' })
    })
    it('day 17, part 2', async function() {
        await test({ year: 2016, day: 17, part: 2, expected: 500 })
    })
    it('day 18, part 1', async function() {
        await test({ year: 2016, day: 18, part: 1, expected: 2016 })
    })
    it('day 18, part 2', async function() {
        await test({ year: 2016, day: 18, part: 2, expected: 19998750 })
    })
    it('day 19, part 1', async function() {
        await test({ year: 2016, day: 19, part: 1, expected: 1830117 })
    })
    // it('day 19, part 2', async function() {
    //     await test({ year: 2016, day: 19, part: 2, expected: 12345 })
    // })
    it('day 20, part 1', async function() {
        await test({ year: 2016, day: 20, part: 1, expected: 22887907 })
    })
    it('day 20, part 2', async function() {
        await test({ year: 2016, day: 20, part: 2, expected: 109 })
    })
    it('day 21, part 1', async function() {
        await test({ year: 2016, day: 21, part: 1, expected: 'fdhbcgea' })
    })
    // it('day 21, part 2', async function() {
    //     await test({ year: 2016, day: 21, part: 2, expected: 12345 })
    // })
})