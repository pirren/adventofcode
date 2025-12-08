import { pipe } from '../../lib/utils.js'

export const metadata = {
  "Puzzle Name": "Secret Entrance"
};

const parse = input => 
  input
    .map(x => {
      const D = x[0] == 'L' ? -1 : 1;
      const N = +x.substring(1, x.length);
      return { D, N }
    });

const turn = data => {
  let dial = 50;

  const turn = (d, n) => {
    let shift = d * n;
    dial = (dial + shift) % 100;
    if (dial < 0) dial += 100;
  };

  let password = 0;

  for (let {D, N} of data) {
    turn(D, N);
    if (dial == 0) {
      password++;
    }
  }

  return password; // 745 too low, 25 not right, 1002 too low
};

export default pipe(
  parse,
  turn
);