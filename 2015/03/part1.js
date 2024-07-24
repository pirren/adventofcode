import _ from 'lodash'

export default function solution (input) {
    let instructions = input.split('')
    let pos = [0,0]
    let seen = new Set([[pos].toString()])
    const directions = { '^': [0, -1], 'v': [0, 1], '>': [1, 0], '<': [-1, 0] }

    const move = (ins, pos) => {
        let [x, y] = pos
        let [dx, dy] = directions[ins]
        return [x + dx, y + dy]
    }
    instructions.forEach(ins => {
        pos = move(ins, pos)
        seen.add([pos].toString())
    })

    return seen.size
}