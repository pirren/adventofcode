import deploy from './light-decorations.js'

export default function solution (input) {
    return deploy(input, () => 1, () => 0, (val) => 1 >> val)
}
