import { Interpreter } from './interpreter.js'

export default function solution (input) {
    return new Interpreter().executeInstructions(input, {})
}