import { Interpreter } from "./interpreter.js"

export default function solution (input) {
    let interpreter = new Interpreter()
    return  interpreter.executeInstructions(input, {c : 1})
}