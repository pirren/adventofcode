// Description: Script entrypoint for leaderboard generation and display.
import leaderboard from '../core/leaderboard.js'
import _ from 'lodash'

const [ year = 2015 ] = process.argv.slice(2)
    .map(Number)
    .slice(0, 1)

if (isNaN(year)) {
    console.log('Invalid arguments. Please provide a valid year.')
    process.exit(1) 
}

leaderboard(year)