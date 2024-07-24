import _ from 'lodash'

export default function solution (input) {
    return input.reduce((nice, line) => {
        let pair = line.match(/(\w{2}).*\1/) !== null
        let repeats = line.match(/(.).\1/g) !== null
        return nice + (pair & repeats)
    }, 0)
}