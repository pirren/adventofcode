import { pipe, sum } from '../../lib/utils.js'
import { largestJoltages } from './part1.js'

export const metadata = {
  "Puzzle Name": "Lobby"
};

export default pipe(
  largestJoltages(12),
  sum
);