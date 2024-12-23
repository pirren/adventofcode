import { pipe, sum } from '../../lib/utils.js'
import { parse, sorted } from './part1.js'

export const metadata = {
    "Puzzle Name": "Print Queue"
}

const getCorrected = ({ rules, updates }) => {
    const precedenceMap = rules.reduce(
        (map, [first, second]) => ((map[first] = map[first] || []).push(second), map), 
        {}
    );

    let queue = updates.filter(update => !sorted(update, precedenceMap))
    let correctedUpdates = []

    while(queue.length) {
        let currentUpdate = queue.shift();

        if (sorted(currentUpdate, precedenceMap)) {
            correctedUpdates.push(currentUpdate)
            continue;
        }

        for (let i = 0; i < currentUpdate.length; i++) {
            const currentPage = currentUpdate[i];

            // Find a page before i that violates the precedence rule with currentPage
            const swapIndex = currentUpdate.findIndex(
                (page, j) => j < i && precedenceMap[currentPage]?.includes(page)
            );

            if (swapIndex !== -1) {
                // Swap the pages to fix the order
                [currentUpdate[swapIndex], currentUpdate[i]] = [currentUpdate[i], currentUpdate[swapIndex]];
                queue.push(currentUpdate);
                break;
            }
        }
    }

    return correctedUpdates.map(update => update.at((update.length - 1) / 2));
};

export default pipe (
    parse,
    getCorrected,
    sum
)
