/**
 * test.js
 *
 * Description: Run a test for a day of Advent of Code
 */

import { assert } from 'chai'
import runAsync from './run.js'

export default async function test({
  context = null,
  year = null,
  day = null,
  part = null,
  expected = undefined,
  timeout = 30000
}) {
  if (!year || !day || !part) {
    throw new Error('Year, day and part are required');
  }

  // If expected is undefined, treat this as "not implemented yet" → mark test pending
  if (expected === undefined) {
    // Mocha's programmatic skip
    context?.skip?.();
    return;
  }

  context?.timeout?.(timeout);

  const actual = await runAsync({ year, day, part, output: false });

  return assert.strictEqual(actual, expected);
}