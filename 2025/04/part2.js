import { pipe } from '../../lib/utils.js'

export const metadata = {
  "Puzzle Name": "Printing Department"
};

const parse = input =>
  input.map(x => [...x]);

const inBounds = (x, y, width, height) => 
  y >= 0 && y < height && x >= 0 && x < width

const neighbors8 = [
  [-1, -1], [0, -1], [1, -1],
  [-1,  0],          [1,  0],
  [-1,  1], [0,  1], [1,  1]
];

const countNeighbors = (map, x, y) => 
  neighbors8
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([xx, yy]) => inBounds(xx, yy, map[0].length, map.length))
    .filter(([xx, yy]) => map[yy][xx] === '@')
    .length;

const isQualified = (map, x, y) => 
  countNeighbors(map, x, y) < 4;

const countPapers = (map, totalRemoved = 0) => {
  const { nextMap, removedThisStep } = stepMap(map);

  if (removedThisStep === 0) 
    return totalRemoved;

  return countPapers(nextMap, totalRemoved + removedThisStep);
};

const stepMap = map => {
  let removedThisStep = 0;

  const nextMap = map.map((row, y) => 
    row.map((ch, x) => {
      if (ch !== '@') return ch;

      if(isQualified(map, x, y)) {
        removedThisStep += 1;
        return '.';
      }

      return ch;
    })
  );

  return { nextMap, removedThisStep };
};

export default pipe(
  parse,
  countPapers
);