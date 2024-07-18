import _ from 'lodash';
import runAsync from './run.js'

let [year, day, part] = [2016, 2, 1]; // todo: default

let args = _.compact([process.argv[2], process.argv[3], process.argv[4]])
if (args.length === 3) {
    [year, day, part] = args
} else if (args.length === 2) {
    [day, part] = args
} else if (args.length === 1) {
    [part] = args
}


await runAsync(year, day, part)