import { ints } from '../../lib/parsing.js'
import { pipe } from '../../lib/utils.js'

export const metadata = {
  "Puzzle Name": "Cafeteria"
};

const parse = input => {
  const sepIndex = input.indexOf("");

  const rangePart = input.slice(0, sepIndex);
  const idPart = input.slice(sepIndex + 1);

  const ranges = rangePart.map(r => r.split('-'));
  const ids = idPart.map(ints).flat();

  return { ranges, ids };
};

const traverse = ({ ranges, ids }) =>
  ids
    .filter(id => 
      ranges.some(([start, end]) => start <= id && id <= end)
    )
    .length;

export default pipe(
  parse,
  traverse
);