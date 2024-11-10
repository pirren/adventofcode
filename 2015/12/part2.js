import sumNumericValues from './sumNumericValues.js'

export default function solution (input) {
    return sumNumericValues(JSON.parse(input), { doubleCount: true })
}