import { assert } from 'chai'
import runAsync from '../run.js'

describe('advent of code 2015', () => {
    async function test(day, part, expected) {
        const actual = await runAsync(2015, day, part, false)
        return assert.equal(expected, actual)
    }

    it('day 01, part 1', () => test(1, 1, 280))
    it('day 01, part 2', () => test(1, 2, 1797))
    it('day 02, part 1', () => test(2, 1, 1586300))
    it('day 02, part 2', () => test(2, 2, 3737498))
    it('day 03, part 1', () => test(3, 1, 2565))
    it('day 03, part 2', () => test(3, 2, 2639))
    it('day 04, part 1', () => test(4, 1, 117946))
    it('day 04, part 2', () => test(4, 2, 3938038))
    it('day 05, part 1', () => test(5, 1, 255))
    it('day 05, part 2', () => test(5, 2, 55))
    it('day 06, part 1', () => test(6, 1, 377891))
    it('day 06, part 2', () => test(6, 2, 14110788))
    it('day 07, part 1', () => test(7, 1, 16076))
    it('day 07, part 2', () => test(7, 2, 2797))
    it('day 08, part 1', () => test(8, 1, 1333))
    it('day 08, part 2', () => test(8, 2, 2046))
    it('day 09, part 1', () => test(9, 1, 117))
    it('day 09, part 2', () => test(9, 2, 909))
    it('day 10, part 1', () => test(10, 1, 360154))
    it('day 10, part 2', () => test(10, 2, 5103798))
    it('day 11, part 1', () => test(11, 1, 'cqjxxyzz'))
    it('day 11, part 2', () => test(11, 2, 'cqkaabcc'))
})