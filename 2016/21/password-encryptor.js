import _ from 'lodash'

export function encrypt (password, instructions) {
    password = password.split('')
    
    instructions.forEach(ins => {
        if (ins.startsWith('swap position')) {
            let [_, arg1, arg2] = ins.match(/swap position (\d+) with position (\d+)/).map(Number)
            swap(password, arg1, arg2)
        }
        if (ins.startsWith('swap letter')) {
            let [_, arg1, arg2] = ins.match(/swap letter (\w) with letter (\w)/)
            swap(password, password.indexOf(arg1), password.indexOf(arg2))
        }
        if (ins.startsWith('rotate left')) {
            let [_, arg1] = ins.match(/rotate left (\d+)/).map(Number)
            password = rotateLeft(password, arg1)
        }
        if (ins.startsWith('rotate right')) {
            let [_, arg1] = ins.match(/rotate right (\d+)/).map(Number)
            password = rotateRight(password, arg1)
        }
        if (ins.startsWith('rotate based')) {
            let [_, arg1] = ins.match(/rotate based on position of letter (\w+)/)
            let index = password.indexOf(arg1)
            let rotations = index + (index >= 4 ? 2 : 1)
            password = rotateRight(password, rotations)
        }
        if (ins.startsWith('reverse positions')) {
            let [_, arg1, arg2] = ins.match(/reverse positions (\d+) through (\d+)/).map(Number)
            password = reverse(password, arg1, arg2)
        }

        if (ins.startsWith('move position')) {
            let [_, arg1, arg2] = ins.match(/move position (\d+) to position (\d+)/).map(Number)
            let value = password.splice(arg1, 1)[0]
            password.splice(arg2, 0, value)
        }
    })

    return password.join('')
}

const swap = (password, from, to) => [password[from], password[to]] = [password[to], password[from]]

const rotateRight = (password, steps) => {
    steps = steps % password.length
    return [
        ..._.takeRight(password, steps),
        ..._.take(password, password.length - steps)
    ]
}

const rotateLeft = (password, steps) => {
    return [
        ...password.slice(steps),
        ...password.slice(0, steps)
    ]
}

const reverse = (password, from, to) => {
    return [
        ...password.slice(0, from),
        ...password.slice(from, to + 1).reverse(),
        ...password.slice(to + 1)
    ]
}