export default function solution (input) {
    return input.reduce((nice, line) => {
        let vowels = line.match(/[aeiou]/g)?.length > 2
        let double = line.match(/(.)\1/g) !== null
        let allowed = line.match(/ab|cd|pq|xy/g) === null
        return nice + (vowels & double & allowed)
    }, 0)
}