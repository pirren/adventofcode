export default function deliver(input, selectSanta) {
    let instructions = input.split('')
    let positions = [[0,0], [0,0]]
    let seen = new Set([[0, 0].toString()])
    const directions = { '^': [0, -1], 'v': [0, 1], '>': [1, 0], '<': [-1, 0] }

    const move = (ins, pos) => {
        let [x, y] = pos
        let [dx, dy] = directions[ins]
        return [x + dx, y + dy]
    }
    instructions.forEach((ins, index) => {
        let santa = selectSanta(index)
        positions[santa] = move(ins, positions[santa])
        seen.add(positions[santa].toString())
    }) 

    return seen.size
}