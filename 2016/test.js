import { expect } from 'chai'
import runAsync from '../run.js'

describe('advent of code 2016', () => {
    async function test(day, part, expected) {
        const actual = await runAsync(2016, day, part, false)
        return expect(actual).to.equal(expected);
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
})