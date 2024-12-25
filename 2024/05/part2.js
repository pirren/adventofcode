import { pipe, sum } from '../../lib/utils.js'
import { parse, sorted } from './part1.js'

export const metadata = {
    "Puzzle Name": "Print Queue"
};

const getCorrected = ({ rules, updates }) => {
    const precedenceMap = rules.reduce((map, [first, second]) => {
        return { ...map, [first]: [...(map[first] || []), second] };
    }, {});

    const correctOrder = (initialQueue) => {
        const correctedUpdates = [];
        let queue = [...initialQueue];

        while (queue.length) {
            const currentUpdate = queue.shift();

            if (sorted(currentUpdate, precedenceMap)) {
                correctedUpdates.push(currentUpdate);
                continue;
            }

            const swappedUpdate = currentUpdate.reduce((result, currentPage, i) => {
                if (result) return result;

                const index = currentUpdate.findIndex(
                    (page, j) => j < i && precedenceMap[currentPage]?.includes(page)
                );

                if (index !== -1) {
                    const newUpdate = [...currentUpdate];
                    [newUpdate[index], newUpdate[i]] = [newUpdate[i], newUpdate[index]];
                    return newUpdate;
                }

                return null;
            }, null);

            if (swappedUpdate) {
                queue.push(swappedUpdate);
            }
        }

        return correctedUpdates;
    };

    const initialQueue = updates.filter((update) => !sorted(update, precedenceMap));
    return correctOrder(initialQueue);
};

const middleValue = update => update.at((update.length - 1) / 2);

export default pipe (
    parse,
    getCorrected,
    c => sum(c.map(middleValue))
);
