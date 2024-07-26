export default function solution(input) {
    return input.reduce((total, line) => total + JSON.stringify(line).length - line.length, 0)
}