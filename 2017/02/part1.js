export const metadata = {
    "Puzzle Name": "Corruption Checksum"
}

export default function solution (input) {
    return input.map(line => line.match(/([0-9]+)/g).map(Number))
        .reduce((sum, line) => (sum + Math.max(...line) - Math.min(...line)), 0)
}
