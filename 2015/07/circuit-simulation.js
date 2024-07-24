export class Wire {
    constructor(name, exp, output = null){
        this.name = name
        this.exp = exp
        this.output = output
    }

    isEvaluable = (context) => {
        let variables = this.exp.match(/([a-z]+)/g) || []
        return variables.every(v => context.hasOwnProperty(v))
    }
    
    safeEval = (context) => {
        let evalExp = this.exp.replace(/\b([a-z]+)\b/g, 'context.$1');
        let func = new Function('context', `return (${evalExp}) & 0xFFFF;`);
        this.output = func(context);
        return this.output
    }
}

export function simulate(input, wireConstructor, context = {}) {
    let targetWire = 'a'

    let wires = input.map(toEvaluable).map(([exp, name]) => wireConstructor(name, exp, context))

    while (!context.hasOwnProperty(targetWire)) {
        let queue = wires.filter(wire => !wire.output)
        while (queue.length > 0) {
            let wire = queue.shift()
            if (wire.isEvaluable(context)) {
                let value = wire.safeEval(context)
                context[wire.name] = value
            }
        }
    }

    return context['a']
}

const toEvaluable = (line) => line
    .replace(/AND/, '&')
    .replace(/OR/, '|')
    .replace(/LSHIFT/, '<<')
    .replace(/RSHIFT/, '>>')
    .replace(/NOT/, '~')
    .split(' -> ')