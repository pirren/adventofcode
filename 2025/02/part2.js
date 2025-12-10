import { pipe } from '../../lib/utils.js'
import { parseRanges, sumInvalidIds } from './part1.js'

export const metadata = {
  "Puzzle Name": "Gift Shop"
};

const isInvalidId = id =>
  id.toString().match(/^(.+)\1+$/)

export default pipe(
  parseRanges,
  sumInvalidIds(isInvalidId)
);