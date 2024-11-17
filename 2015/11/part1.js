import nextPassword from './nextPassword.js'

export const metadata = {
    "Puzzle Name": "Corporate Policy"
}

export default function solution (input) {
    return nextPassword(input, 1)
}