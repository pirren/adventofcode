export const metadata = {
    "Puzzle Name": "Doesn't He Have Intern-Elves For This?"
}

export default function solution (input) {
    return input.reduce((nice, line) => {
        let pair = line.match(/(\w{2}).*\1/) !== null
        let repeats = line.match(/(.).\1/g) !== null
        return nice + (pair & repeats)
    }, 0)
}