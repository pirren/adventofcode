export default function solution (input) {
    return input.reduce((paper, line) => {
        let [_, l, w, h] = /(\d+)x(\d+)x(\d+)/.exec(line).map(Number)
        return paper + (2*l*w) + (2*w*h) + (2*h*l) + Math.min(l*w, w*h, h*l)
    }, 0)
}