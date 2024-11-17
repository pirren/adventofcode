import deploy from './light-decorations.js'

export const metadata = {
    "Puzzle Name": "Probably a Fire Hazard"
}

export default function solution (input) {
    return deploy(input, { on: val => val + 1, off: val => Math.max(val - 1, 0), toggle: val => val + 2 })
}
