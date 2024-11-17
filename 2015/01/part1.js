export const metadata = {
    "Puzzle Name": "Not Quite Lisp"
}

export default function solution (input) {
    return input.split('').reduce((floor, ins) => floor + (ins === '(' ? 1 : -1), 0)
}