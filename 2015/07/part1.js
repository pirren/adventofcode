import { Wire, simulate } from './circuit-simulation.js'

export const metadata = {
    "Puzzle Name": "Some Assembly Required"
}

export default function solution (input) {
    return simulate(input, { wireConstructor: (name, exp) => new Wire(name, exp) })
}
