import { assert } from 'chai'
import runAsync from '../run.js'

describe('advent of code 2016', () => {
    async function test(day, part, expected) {
        const actual = await runAsync(2016, day, part, false)
        return assert.equal(expected, actual)
    }

    it('day 01, part 1', () => test(1, 1, 271))
    it('day 01, part 2', () => test(1, 2, 153))
    it('day 02, part 1', () => test(2, 1, 52981))
    it('day 02, part 2', () => test(2, 2, '74CD2'))
    it('day 03, part 1', () => test(3, 1, 862))
    it('day 03, part 2', () => test(3, 2, 1577))
    it('day 04, part 1', () => test(4, 1, 158835))
    it('day 04, part 2', () => test(4, 2, 993))
    it('day 05, part 1', () => test(5, 1, 'c6697b55'))
    it('day 05, part 2', () => test(5, 2, '8c35d1ab'))
    it('day 06, part 1', () => test(6, 1, 'wkbvmikb'))
    it('day 06, part 2', () => test(6, 2, 'evakwaga'))
    it('day 07, part 1', () => test(7, 1, 115))
    it('day 07, part 2', () => test(7, 2, 231))
    it('day 08, part 1', () => test(8, 1, 128))
    it('day 08, part 2', () => test(8, 2, 'EOARGPHYAO'))
    it('day 09, part 1', () => test(9, 1, 152851))
    it('day 09, part 2', () => test(9, 2, 11797310782))
    it('day 10, part 1', () => test(10, 1, 118))
    it('day 10, part 2', () => test(10, 2, 143153))
    it('day 12, part 1', () => test(12, 1, 318077))
    it('day 12, part 2', () => test(12, 2, 9227731))
    it('day 13, part 1', () => test(13, 1, 92))
    it('day 13, part 2', () => test(13, 2, 124))
})