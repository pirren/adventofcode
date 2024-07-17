import _ from 'lodash'

export default function solution (input) {
    let instructions = _.split(input, ', ');
    let [dir_x, dir_y] = [0, -1];
    let at = { x: 0, y: 0 };
    let seen = [[at['x'], at['y']]];

    while (instructions.length > 0) {
        let next_ins = instructions.shift();
        let [_, next_dir, steps] = /([A-Z])(\d+)/.exec(next_ins);

        [dir_x, dir_y] = next_dir === 'R' 
            ? [-dir_y, dir_x]   // 90 degrees clockwise
            : [dir_y, -dir_x];  // 90 degrees counterclockwise
        
        for (let i = 0; i < steps; i++) {
            at['x'] += dir_x;
            at['y'] += dir_y;

            let exists = seen.some(pos => pos[0] === at['x'] && pos[1] === at['y']);
            if (exists) {
                return Math.abs(at['x']) + Math.abs(at['y']);
            }

            seen.push([at['x'], at['y']]);
        }
    }

    throw new Error('No solution found')
} 
