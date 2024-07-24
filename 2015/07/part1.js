import { Wire, simulate } from './circuit-simulation.js'

export default function solution (input) {
    return simulate(input, (name, exp) => new Wire(name, exp))
}