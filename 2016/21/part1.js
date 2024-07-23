import _ from 'lodash'
import { encrypt } from './password-encryptor.js'

export default function solution (input) {
    let password = 'abcdefgh'
    return encrypt(password, input)
}