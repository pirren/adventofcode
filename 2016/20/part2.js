import _ from 'lodash'
import { allowedIPs } from './blacklist.js'

export default function solution (input) {
    return allowedIPs(input, false)
}