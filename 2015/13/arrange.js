import { permute } from '../../lib/iter-tools.js' 

export default function arrange (input, { addSelf = false } = {}) {
    let nodes = input.map(parse).reduce((acc, { left, score, right }) => {
        acc[left] ??= {}
        acc[left][right] = score
        return acc
    }, {});

    if (addSelf) {
        for(const name in nodes) {
            nodes[name]['self'] = 0
        }
        nodes['self'] = Object.fromEntries(Object.keys(nodes).map(name => [name, 0]));
    }

    return permute(Object.keys(nodes)).reduce((max, perm) => {
        let score = 0, len = perm.length;
        for (let i = 0; i < len; i++) {
            let left = perm[i]
            let right = perm[(i + 1) % len]
            score += nodes[left][right] + nodes[right][left]
        }
        return Math.max(max, score)
    }, 0);
}

function parse(line) {
    let [left, score, right] = /(\w+).*?(\d+).*?(\w+)\./.exec(line).slice(1);
    score = parseInt(score)
    score = score * (line.includes('lose') ? -1 : 1)
    return { left, score, right }
}