/**
 * setup.js
 *
 * Description: Create directories and files for a new day of Advent of Code
 */

import _ from 'lodash'
import fs from 'fs'
import chalk from 'chalk'

const formatDay = day => _.padStart(day, 2, '0')

function getTestFileTemplate(year) {
    const template = `
    // Description: Tests for Advent of Code ${year} solutions.
    import test from '../core/test.js'

    describe('advent of code ${year}', () => {
    })`

    return template
        .trim().split('\n')
        .map(line => line.trim())
        .join('\n')
}

function addTestsFromTemplate(tests, { year = null, day = null } = {}) {
    const template = `
    it('day ${formatDay(day)}, part 1', async function() {
        await test({ year: ${year}, day: ${day}, part: 1, expected: 12345 })
    })
    it('day ${formatDay(day)}, part 2', async function() {
        await test({ year: ${year}, day: ${day}, part: 2, expected: 12345 })
    })`
    .replace(/^\n|\n$/g, '').trimEnd();

    tests.splice(tests.length - 1, 0, template)
}

function getSolutionTemplate() {
    return [
        `import { ints } from '../../lib/parsing.js'`,
        `import { pipe } from '../../lib/utils.js'`,
        ``,
        `export const metadata = {`,
        `    "Puzzle Name": undefined`,
        `};`,
        ``,
        `const parse = input => {`,
        ``,
        `};`,
        ``,
        `export default pipe(`,
        `    parse`,
        `);`
    ].join('\n')
}

export default function setup({ year = null, day = null } = {}) {
    if (!day || !year) {
        console.log(chalk.red('Provide a year and day.'))
        process.exit(1)
    }

    let dayFormatted = formatDay(day)
    
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
    
    // -- Create empty input file
    console.log(`Creating input file...`)
    fs.mkdirSync(dir)
    fs.writeFileSync(`${dir}/input.txt`, '12345')
    
    // -- Create code from template
    console.log(`Creating code for parts 1 and 2...`)
    let dayTemplate = getSolutionTemplate()

    fs.writeFileSync(`${dir}/part1.js`, dayTemplate)
    fs.writeFileSync(`${dir}/part2.js`, dayTemplate)
    
    // -- Create test file from template if it doesn't exist
    let testPath = `./${year}/test.js`
    if (!fs.existsSync(testPath)) {
        console.log(`Creating test file...`)
        const testFileTemplate = getTestFileTemplate(year);
        fs.writeFileSync(testPath, testFileTemplate)
    }

    // -- Add tests to test file from template
    console.log(`Creating unit tests...`)
    let tests = fs.readFileSync(testPath, 'utf-8').split('\n')
    addTestsFromTemplate(tests, { year, day })
    fs.writeFileSync(testPath, tests.join('\n'))

    console.log(chalk.green('Setup complete.'))
}