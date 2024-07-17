import _ from 'lodash'

export default function solution (input) {
    let instructions = _.split(input, ', ');
    let [dir_x, dir_y] = [0, -1];
    let at = [0,0];

    while (instructions.length > 0) {
        let next_ins = instructions.shift();
        let [_, next_dir, steps] = /([A-Z])(\d+)/.exec(next_ins);

        [dir_x, dir_y] = next_dir === 'R' 
            ? [-dir_y, dir_x]   // 90 degrees clockwise
            : [dir_y, -dir_x];  // 90 degrees counterclockwise
        
        at[0] += dir_x * steps;
        at[1] += dir_y * steps;
    }

    return Math.abs(at[0]) + Math.abs(at[1]);
} 
