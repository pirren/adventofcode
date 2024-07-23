import _ from 'lodash'
import { encrypt } from './password-encryptor.js'

export default function solution (input) {
    let password = 'abcdefgh'//.split('')
    return encrypt(password, input)

    const swap = (from, to) => {
        let temp = password[from]
        password[from] = password[to]
        password[to] = temp
    }

    const rotateRight = (steps) => {
        steps = steps % password.length
        let first = _.takeRight(password, steps)
        let last = _.take(password, password.length - steps)
        password = first.concat(last)
    }

    const rotateLeft = (steps) => {
        password = password.slice(steps).concat(password.slice(0, steps))
    }

    const reverse = (from, to) => {
        let before = _.slice(password, 0, from)
        let after = _.slice(password, to + 1, password.length + 1)
        let reversed = _.slice(password, from, to + 1).reverse()
        password = before.concat(reversed, after)
    }

    while (input.length > 0) {
        let ins = input.shift()
        if (ins.startsWith('swap position')) {
            let [_, arg1, arg2] = ins.match(/swap position (\d+) with position (\d+)/).map(Number)
            swap(arg1, arg2)
        }
        if (ins.startsWith('swap letter')) {
            let [_, arg1, arg2] = ins.match(/swap letter (\w) with letter (\w)/)
            swap(password.indexOf(arg1), password.indexOf(arg2))
        }
        if (ins.startsWith('rotate left')) {
            let [_, arg1] = ins.match(/rotate left (\d+)/).map(Number)
            rotateLeft(arg1)
        }
        if (ins.startsWith('rotate right')) {
            let [_, arg1] = ins.match(/rotate right (\d+)/).map(Number)
            rotateRight(arg1)
        }
        if (ins.startsWith('rotate based')) {
            let [_, arg1] = ins.match(/rotate based on position of letter (\w+)/)
            let index = password.indexOf(arg1)
            let rotations = index + (index >= 4 ? 2 : 1)
            rotateRight(rotations)
        }
        if (ins.startsWith('reverse positions')) {
            let [_, arg1, arg2] = ins.match(/reverse positions (\d+) through (\d+)/).map(Number)
            reverse(arg1, arg2)
        }

        if (ins.startsWith('move position')) {
            let [_, arg1, arg2] = ins.match(/move position (\d+) to position (\d+)/).map(Number)
            let value = password.splice(arg1, 1)[0]
            password.splice(arg2, 0, value)
        }
    }

    return password.join('')
}