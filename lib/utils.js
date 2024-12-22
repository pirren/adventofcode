/**
 * Composes multiple functions into a single function.
 * The functions are executed from left to right.
 *
 * @param {...Function} fns - The functions to compose.
 * @returns {Function} A function that takes an argument and applies the composed functions to it.
 */
export const pipe = (...fns) => arg => fns.reduce((a, f) => f(a), arg);

/**
 * Sums the values of an array.
 * @param {*} arr - The array to sum.
 * @returns {number} The sum of the values in the array.
 */
export const sum = arr => arr.reduce((a, b) => a + b, 0);