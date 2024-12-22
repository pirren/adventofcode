// import _ from 'lodash'
import { ints } from '../../lib/parsing.js'
import { 
    sum, 
    pipe 
} from '../../lib/utils.js'

export const metadata = {
    "Puzzle Name": "Mull It Over"
}

const parse = input => 
    input.join().match(/mul\((\d+),(\d+)\)/g).map(ints);

const process = input =>
    input.map(([a, b]) => a * b);

export default pipe(
    parse, 
    process,
    sum
);
