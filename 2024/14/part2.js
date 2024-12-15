import _ from 'lodash'

export const metadata = {
    "Puzzle Name": "Restroom Redoubt"
}

export default function solution (input) {
    let w = 101, h = 103;
    let robots = input.map(parse);
    let timeElapsed = 0;
    const target_time = 10000

    const walk = (robot) => {
        // Calculate the next position
        let px = (robot.px + robot.vx) % w;
        let py = (robot.py + robot.vy) % h;

        // Handle negative wrapping
        if (px < 0) px += w;
        if (py < 0) py += h;

        return { ...robot, px, py };
    }

    while(timeElapsed < target_time) {
        let seen = new Set();
        for (let i = 0; i < robots.length; i++) {
            robots[i] = walk(robots[i]);
            seen.add(`${robots[i].px},${robots[i].py}`);
        }
        timeElapsed++;
        if (seen.size == robots.length) 
            break;
    }

    return timeElapsed; 
}

function parse(line) {
    let [px, py, vx, vy] = line.match(/-?\d+/g).map(Number);
    return { px, py, vx, vy };
}
