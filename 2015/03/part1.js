import _ from 'lodash'
import deliver from './deliver-presents.js'

export default function solution (input) {
    return deliver(input, () => 0)
}