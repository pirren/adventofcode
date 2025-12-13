import { pipe, sum } from '../../lib/utils.js'

export const metadata = {
  "Puzzle Name": "Trash Compactor"
};

const rotateCounterClockwise = matrix =>
  matrix[0].map((_, colIndex) =>
    matrix.map(row => row[row.length - 1 - colIndex])
  );

const parseGrid = input =>
  input.map(x => [...x]);

const groupByEmpty = arr => {
  const groups = [];
  let next = [];

  for (const token of arr) {
    if (token === '') {
      groups.push(next);
      next = [];
    } else {
      next.push(token);
    }
  }

  if (next.length) groups.push(next);
  return groups;
}

const parseProblems = matrix => {
  const operations = matrix
    .at(-1)
    .filter(x => x !== ' ')
    .reverse();

  matrix = rotateCounterClockwise(matrix.slice(0, -1));

  const numbers = groupByEmpty(
    matrix
      .map(row =>
        row.join('').trim()
      )
  );

  return operations
    .map((op, i) =>
      numbers[i].join(op)
    );
};

const solveProblem = exp =>
  new Function(`return ${exp}`)();

const solveAll = problems =>
  problems.map(solveProblem)

export default pipe(
  parseGrid,
  parseProblems,
  solveAll,
  sum
);