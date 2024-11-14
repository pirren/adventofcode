export default function solution (input) {
    let floor = 0
    for (let i = 0; i < input.length; i++) {
        if ((floor += input[i] === '(' ? 1 : -1) === -1) 
            return i + 1
    }
}