import sumNumericValues from './sumNumericValues.js'

export const metadata = {
    "Puzzle Name": "JSAbacusFramework.io"
}

export default function solution (input) {
    return sumNumericValues(JSON.parse(input), { doubleCount: true })
}