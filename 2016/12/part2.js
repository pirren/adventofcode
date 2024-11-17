import { Interpreter } from "./interpreter.js"

export const metadata = {
    "Puzzle Name": "Leonardo's Monorail"
}

export default function solution (input) {
    let interpreter = new Interpreter()
    return  interpreter.executeInstructions(input, {c : 1})
}