import { Wire, simulate } from './circuit-simulation.js'

export default function solution (input) {
    return simulate(input, { 
       wireConstructor: (name, exp, context) => new Wire(name, exp, name === 'b' ? context['b'] : null), 
       context: { 'b' : 16076 }
    })
}
