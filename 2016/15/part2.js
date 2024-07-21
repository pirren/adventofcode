import _ from 'lodash'
import alignsAt from './alignment.js'

export default function solution (input) {
    return alignsAt(input, { positions: 11, start: 0 })
}
