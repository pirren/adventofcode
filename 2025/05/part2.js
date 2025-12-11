import { ints } from '../../lib/parsing.js'
import { pipe } from '../../lib/utils.js'

export const metadata = {
  "Puzzle Name": "Cafeteria"
};

const parse = input => {
  let sepIndex = input.indexOf("");

  let rangePart = input.slice(0, sepIndex);

  return rangePart
    .map(r => 
      r
        .split('-')
        .map(ints)
        .flat()
      );;
}

const mergeRanges = ranges =>
  ranges
    .sort((a, b) => a[0] - b[0])
    .reduce((acc, curr) => {
      if (acc.length === 0) 
        return [curr];

      const last = acc[acc.length - 1];
      const [lastStart, lastEnd] = last;
      const [currStart, currEnd] = curr;

      if (currStart <= lastEnd) {
        const merged = [lastStart, Math.max(lastEnd, currEnd)];
        return [...acc.slice(0, -1), merged];
      }

      return [...acc, curr];
    }, []);

const steps = mergedRanges => 
  mergedRanges
    .reduce((total, [start, end]) =>
      total += end - start + 1
    , 0);

export default pipe(
  parse,
  mergeRanges,
  steps
);