import { expect } from 'chai'
import runAsync from '../run.js'

describe('advent of code 2016', () => {
    async function test(day, part, expected) {
        const actual = await runAsync(2016, day, part, false)
        return expect(actual).to.equal(expected);
    }

    it('day 01, part 1', () => test(1, 1, 271))
    it('day 01, part 2', () => test(1, 2, 153))
})