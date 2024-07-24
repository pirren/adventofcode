import { Wire, simulate } from './circuit-simulation.js'

export default function solution (input) {
    return simulate(input, (name, exp, context) => new Wire(name, exp, name === 'b' ? context['b'] : null), { 'b' : 16076 })
}