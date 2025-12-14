import { defaultDict } from '../../lib/dict.js'
import { pipe } from '../../lib/utils.js'

export const metadata = {
  "Puzzle Name": "Laboratories"
};

const parse = input => {
  return {
    map: input.flatMap(x => [...x]),
    width: input[0].length,
    height: input.length
  };
};

const moveBeam = (beam, map, width) => {
  let idx = beam + width;
  if (idx >= map.length) return [];

  let nextToken = map[idx];
  return nextToken == '^' ? [idx - 1, idx + 1] : [idx];
};

const step = (state, map, width) => {
  let [beam, ...rest] = state.queue;

  const count = state.memo[beam];

  if (count === 0) {
    return {
      ...state,
      queue: rest
    };
  }

  state.memo[beam] = 0;

  const next = moveBeam(beam, map, width);

  if (next.length === 0) {
    return {
      ...state,
      queue: rest,
      ended: state.ended + count,
    };
  }

  for (const nb of next) {
    if (nb === undefined) continue;

    const wasZero = state.memo[nb] === 0;
    state.memo[nb] += count;

    if (wasZero) rest.push(nb);
  }

  return {
    ...state,
    queue: rest,
  };
};

const projectBeams = ({ map, width }) => {
  const start = map.indexOf('S');
  const first = start + width;

  let state = {
    queue: [first],
    memo: defaultDict(() => 0),
    ended: 0
  };

  state.memo[first] = 1;

  while (state.queue.length) {
    state = step(state, map, width);
  }

  return state.ended;
};


export default pipe(
  parse,
  projectBeams
);