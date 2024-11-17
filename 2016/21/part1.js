import { encrypt } from './password-encryptor.js'

export const metadata = {
    "Puzzle Name": "Scrambled Letters and Hash"
}

export default function solution (input) {
    let password = 'abcdefgh'
    return encrypt(password, input)
}