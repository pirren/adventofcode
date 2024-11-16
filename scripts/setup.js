// Description: Script entrypoint for setting up the environment for a new day.
import _ from 'lodash'
import setup from '../core/setup.js'

const [ year = 2015, day = 1 ] = process.argv.slice(2)
    .map(Number)
    .slice(0, 2)

if (isNaN(year) || isNaN(day)) {
    console.log('Invalid arguments. Please provide a year and day.')
    process.exit(1) 
}

setup({ year, day })