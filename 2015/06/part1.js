import deploy from './light-decorations.js'

export default function solution (input) {
    return deploy(input, { toggle: val => 1 >> val })
}
