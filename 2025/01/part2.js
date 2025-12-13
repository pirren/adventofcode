import { pipe } from '../../lib/utils.js'

export const metadata = {
  "Puzzle Name": "Secret Entrance"
};

const parse = input => {
  return input.map(x => {
    const dir = x[0] == 'L' ? -1 : 1;
    const num = +x.slice(1);
    return dir * num;
  });
};

const turn = data =>
  undefined

export default pipe(
  parse,
  turn
);