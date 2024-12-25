// Description: This file is the entry point for the CLI. It reads the arguments and runs a single solution.
import runAsync from './core/run.js'

const [ year = 2015, day = 15, part = 1 ] = process.argv.slice(2)
    .map(Number)
    .slice(0, 3)

if (isNaN(year) || isNaN(day) || isNaN(part)) {
    console.log('Invalid arguments. Please provide a year, day and part.')
    process.exit(1) 
}

await runAsync({ year, day, part })
