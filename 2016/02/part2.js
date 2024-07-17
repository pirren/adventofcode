import _ from 'lodash'

export default function solution (input) {
    let directions = { 'U': [0, -1], 'R': [1, 0], 'D': [0, 1], 'L': [-1, 0] }
    let position = [ 0, 2 ]
    let keyPad = [
        ['-', '-', '1', '-', '-'],
        ['-', '2', '3', '4', '-'],
        ['5', '6', '7', '8', '9'],
        ['-', 'A', 'B', 'C', '-'],
        ['-', '-', 'D', '-', '-'],
    ]

    let code = _.reduce(input, (code, line) => {
        let moves = _.split(line, '');
        while (moves.length > 0) {
            let next_move = directions[moves.shift()]
            let newPosition = _.map(position, (value, index) => value + next_move[index])
            
            if (newPosition[0] >= 0 && newPosition[0] < 5 && newPosition[1] >= 0 && newPosition[1] < 5 && keyPad[newPosition[1]][newPosition[0]] !== '-')
                position = newPosition;
        }
        return code + keyPad[position[1]][position[0]];
    }, '')

    return code;
} 
