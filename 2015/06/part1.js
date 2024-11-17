import deploy from './light-decorations.js'

export const metadata = {
    "Puzzle Name": "Probably a Fire Hazard"
}

export default function solution (input) {
    return deploy(input, { toggle: val => 1 >> val })
}
