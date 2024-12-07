import _ from 'lodash'
import { ints } from '../../lib/parsing.js'
import { validateExpression, defaultOps } from './validateExpression.js'

export const metadata = {
    "Puzzle Name": "Bridge Repair"
}

export default function solution (input) {
    const equations = input.map(equation => {
        const [target, ...numbers] = ints(equation)
        return { target, numbers }
    });
    
    let calibrationResult = _.sum(
        equations
            .map(({ target, numbers }) => {
                return validateExpression(target, numbers, { 
                    '||': (a, b) => Number(`${a}${b}`),
                    ...defaultOps
                });
            })
    );

    return calibrationResult;
}