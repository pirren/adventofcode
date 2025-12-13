import { ints } from '../../lib/parsing.js'
import { pipe, sum } from '../../lib/utils.js'

export const metadata = {
  "Puzzle Name": "Trash Compactor"
};

const parse = input => {
  const numbers = input
    .slice(0, -1)
    .flatMap(ints);

  const operations = input
    .at(-1)
    .trim()
    .split(/\s+/);

  return { numbers, operations };
};

const numbersAt = (numbers, width, column) =>
  numbers.filter((_, i) => i % width === column);

const solveOne = exp =>
  new Function(`return ${exp}`)();

const solveAll = ({ numbers, operations }) =>
  operations.map((op, col) =>
    solveOne(
      numbersAt(numbers, operations.length, col)
        .join(op)
    )
  );


export default pipe(
  parse,
  solveAll,
  sum
);