/**
 * setup.js
 *
 * Description: Create directories and files for a new day of Advent of Code
 */

import _ from 'lodash'
import fs from 'fs'
import chalk from 'chalk'

export default function setup({ year = null, day = null } = {}) {
    if (!day || !year) {
        console.log(chalk.red('Provide a year and day.'))
        process.exit(1)
    }

    let dayFormatted = _.padStart(day, 2, '0')
    
    let dir = `./${year}`
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    dir = `./${year}/${dayFormatted}`
    if (fs.existsSync(dir)) {
        console.log(chalk.yellowBright(`${year}.${dayFormatted} already exists.`))
        process.exit(0)
    }
    
    console.log(`Creating directories for ${year}.${dayFormatted}...`)
    
    // Create input
    console.log(`Creating input file...`)
    fs.mkdirSync(dir)
    fs.writeFileSync(`${dir}/input.txt`, '12345')
    
    // -- Create code
    console.log(`Creating code for parts 1 and 2...`)

    let func = `import _ from 'lodash'
import { ints } from '../../lib/parsing.js'

export const metadata = {
    "Puzzle Name": undefined
}
    
export default function solution (input) {
    return input
}`
    
    fs.writeFileSync(`${dir}/part1.js`, func)
    fs.writeFileSync(`${dir}/part2.js`, func)
    
    // -- Create tests
    let testPath = `./${year}/test.js`
    if (!fs.existsSync(testPath)) {
        console.log(`Creating test file...`)
        fs.writeFileSync(testPath, `// Description: Tests for Advent of Code ${year} solutions.
import test from '../core/test.js'

describe('advent of code ${year}', () => {
})`)
    }

    console.log(`Creating unit tests...`)
    let tests = fs.readFileSync(testPath, 'utf-8').split('\n')
    tests.splice(tests.length - 1, 0, 
`    it('day ${dayFormatted}, part 1', async function() {
        await test({ year: ${year}, day: ${day}, part: 1, expected: 12345 })
    })`,
`    it('day ${dayFormatted}, part 2', async function() {
        await test({ year: ${year}, day: ${day}, part: 2, expected: 12345 })
    })`)
    fs.writeFileSync(testPath, tests.join('\n'))
    

    console.log(chalk.green('Setup complete.'))
}