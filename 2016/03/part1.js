import _ from 'lodash'

export default function solution (input) {
    return input.reduce((valid, line) => {
        let [a, b, c] = _.compact(line.split(' ').map(x => parseInt(x, 10)))
        return a + b > c && a + c > b && b + c > a ? valid + 1 : valid
    }, 0)
} 
