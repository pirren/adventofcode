export const metadata = {
    "Puzzle Name": "I Was Told There Would Be No Math"
}

export default function solution (input) {
    return input.reduce((paper, line) => {
        let [_, l, w, h] = /(\d+)x(\d+)x(\d+)/.exec(line).map(Number)
        let [a,b] = [l,w,h].sort((a, b) => a - b).slice(0,2)
        return paper + a + a + b + b + (l * w * h)
    }, 0)
}