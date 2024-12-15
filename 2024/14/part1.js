export const metadata = {
    "Puzzle Name": "Restroom Redoubt"
}

export default function solution (input) {
    let w = 101, h = 103;
    let robots = input.map(parse);
    let timeElapsed = 0;
    const target_time = 100

    const walk = (robot) => {
        let px = (robot.px + robot.vx) % w;
        let py = (robot.py + robot.vy) % h;

        if (px < 0) px += w;
        if (py < 0) py += h;

        return { ...robot, px, py };
    }

    while(timeElapsed < target_time) {
        for (let i = 0; i < robots.length; i++) {
            robots[i] = walk(robots[i]);
        }
        timeElapsed++;
    }

    let quadrants = [0,0,0,0]

    let midW = Math.floor(w / 2)
    let midH = Math.floor(h / 2)

    for (let robot of robots) {
        const { px, py } = robot
        if (py < midH) {
            if (px < midW) {
                quadrants[0]++
            } else if (px >= midW + 1) {
                quadrants[1]++
            }
        } else if (py >= midH + 1) {
            if (px < midW) {
                quadrants[2]++
            } else if (px >= midW + 1) {
                quadrants[3]++
            }
        }
    }

    return quadrants.reduce((acc, val) => acc * val, 1)
}

function parse(line) {
    let [px, py, vx, vy] = line.match(/-?\d+/g).map(Number);
    return { px, py, vx, vy };
}
