import { assert } from 'chai'
import runAsync from '../run.js'

describe('advent of code 2015', () => {
    async function test(day, part, expected) {
        const actual = await runAsync(2015, day, part, false)
        return assert.equal(expected, actual)
    }

    it('day 01, part 1', () => test(1, 1, 280))
    it('day 01, part 2', () => test(1, 2, 1797))
})