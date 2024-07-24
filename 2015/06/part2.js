import deploy from './light-decorations.js'

export default function solution (input) {
    return deploy(input, (val) => val + 1, (val) => Math.max(val - 1, 0), (val) => val + 2)
}
