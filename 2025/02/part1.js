import { ints } from '../../lib/parsing.js'
import { pipe } from '../../lib/utils.js'

export const metadata = {
  "Puzzle Name": "Gift Shop"
};

export const parseRanges = input =>
  input
    .split(',')
    .map(rangeStr =>
      rangeStr
        .split('-')
        .flatMap(ints)
    );

const isMirroredId = id => {
  const s = String(id);
  const mid = s.length / 2;
  return s.slice(0, mid) === s.slice(mid); // left equals right
};

const expandRange = ([start, end]) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const sumInvalidIds = filter => ranges =>
  ranges
    .flatMap(expandRange)
    .filter(filter)
    .reduce((acc, id) => acc + id, 0);

export default pipe(
  parseRanges,
  sumInvalidIds(isMirroredId)
);