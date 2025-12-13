/**
 * Extracts all integers from a given string and returns them as an array of numbers.
 *
 * @param {string} line - The input string containing integers.
 * @returns {number[]} An array of integers found in the input string.
 *
 * @example
 * // returns [123, 456]
 * ints("abc 123 def 456");
 */
export function ints(line) {
  return line.match(/(\d+)/g)?.map(Number) || [];
}