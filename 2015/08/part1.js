export default function solution(input) {
    return input.reduce((total, line) => total + line.length - eval(line).length, 0)
}