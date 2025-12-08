import { ints } from '../../lib/parsing.js'
import { pipe } from '../../lib/utils.js'

export const metadata = {
  "Puzzle Name": "Gift Shop"
};

const parseRanges = input => 
  input
    .split(',')
    .map(rangeStr => 
      rangeStr
        .split('-')
        .flatMap(ints)
    );

const isInvalidId = id =>
  id.toString().match(/^(.+)\1+$/)

const expandRange = ([start, end]) => 
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const sumInvalidIds = ranges =>
  ranges
    .flatMap(expandRange)
    .filter(isInvalidId)
    .reduce((acc, id) => acc + id, 0);

export default pipe(
  parseRanges,
  sumInvalidIds
);