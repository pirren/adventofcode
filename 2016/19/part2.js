export const metadata = {
    "Puzzle Name": "An Elephant Named Joseph"
}

export default function solution (input) {
    return josephus(+input, 2)
}

function josephus(n, interval) {
    let result = 0
    for (let i = 2; i <= n; i++) {
        result = (result + interval) % i
    }
    return result + 1
}