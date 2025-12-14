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

  let nextToken = map[idx]

  return nextToken == '^' ? [idx - 1, idx + 1] : [idx];
};

const step = (state, map, width) => {
  let [beam, ...rest] = state.queue;
  const next = moveBeam(beam, map, width);

  const splits = state.splits + (next.length > 1 ? 1 : 0);
  const unseen = next.filter(nb => !state.seen.has(nb));
  unseen.forEach(nb => state.seen.add(nb));

  return {
    queue: rest.concat(unseen),
    seen: state.seen,
    splits
  }
};

const projectBeams = ({ map, width }) => {
  const start = map.indexOf('S');
  const first = start + width;

  let state = {
    queue: [first],
    seen: new Set([first]),
    splits: 0
  };

  while (state.queue.length) {
    state = step(state, map, width);
  }

  return state.splits;
};


export default pipe(
  parse,
  projectBeams
);