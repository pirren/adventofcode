import deploy from './light-decorations.js'

export default function solution (input) {
    return deploy(input, { on: val => val + 1, off: val => Math.max(val - 1, 0), toggle: val => val + 2 })
}
