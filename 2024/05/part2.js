import _ from 'lodash'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": "Print Queue"
}

export default function solution (input) {
    let [rules, updates] = _.partition(
        input.filter(Boolean), 
        line => line.includes('|')
    ).map(x => x.map(ints));

    let rulesMap = rules.reduce(
        (map, [first, second]) => ((map[first] = map[first] || []).push(second), map), 
        {}
    );

    const isSorted = update => 
        update.every((page, i) => update.slice(0, i).every(p => !rulesMap[page]?.includes(p)));

    let queue = updates.filter(update => !isSorted(update))
    let output = []

    while(queue.length) {
        let next = queue.shift();

        if (isSorted(next)) {
            output.push(next)
            continue;
        }

        for (let i = 0; i < next.length; i++) {
            const page = next[i]
            if (!next.slice(0,i).some(p => rulesMap[page]?.includes(p))) continue;

            let swapIndex = next.findIndex((p, j) => j < i && rulesMap[page]?.includes(p));
            [next[swapIndex], next[i]] = [next[i], next[swapIndex]];
            
            queue.push(next)
            break;
        }
    }
    
    return _.sum(output.map(update => update.at((update.length - 1) / 2)))
}
