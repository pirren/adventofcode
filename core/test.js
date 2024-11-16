/**
 * test.js
 *
 * Description: Run a test for a day of Advent of Code
 */

import { assert } from 'chai'
import runAsync from './run.js'

export default async function test({ year = null, day = null, part = null, expected = null, context = {}, timeout = 30000 }) {
    if (!year || !day || !part || expected === null) {
        throw new Error('Year, day, part and expected value are required')
    } 
    context.timeout?.(timeout)
    const actual = await runAsync({ year, day, part, output: false })
    return assert.equal(expected, actual)
}