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
    
    const output = updates.filter(isSorted)

    return _.sum(output.map(update => update.at((update.length - 1) / 2)))
}
