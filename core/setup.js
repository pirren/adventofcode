/**
 * setup.js
 *
 * Description: Create directories and files for a new day of Advent of Code
 */

import fs from 'fs'
import chalk from 'chalk'

const formatDay = day => day.toString().padStart(2, '0')

function testTemplate(year) {
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
        await test({ year: ${year}, day: ${day}, part: 1, expected: undefined })
    })
    it('day ${formatDay(day)}, part 2', async function() {
        await test({ year: ${year}, day: ${day}, part: 2, expected: undefined })
    })`
    .replace(/^\n|\n$/g, '').trimEnd();

    tests.splice(tests.length - 1, 0, template)
}

function solutionTemplate() {
    return [
        `import { ints } from '../../lib/parsing.js'`,
        `import { pipe } from '../../lib/utils.js'`,
        ``,
        `export const metadata = {`,
        `    "Puzzle Name": undefined`,
        `};`,
        ``,
        `const parse = input => {`,
        `    return undefined;`,
        `};`,
        ``,
        `export default pipe(`,
        `    parse`,
        `);`
    ].join('\n')
};

export default function setup({ year = null, day = null } = {}) {
    if (!day || !year) {
        console.log(chalk.red('Provide a year and day.'))
        process.exit(1)
    }

    const dayFormatted = formatDay(day)
    
    // -- Create directories
    let dir = `./${year}` 
    {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        dir = `./${year}/${dayFormatted}`
        if (fs.existsSync(dir)) {
            console.log(chalk.yellowBright(`${year}.${dayFormatted} already exists.`))
            process.exit(0)
        }
    }
        
    console.log(`Creating directories for ${year}.${dayFormatted}...`)
    
    // -- Create empty input file 
    {
        console.log(`Creating input file...`)
        fs.mkdirSync(dir)
        fs.writeFileSync(`${dir}/input.txt`, '')
    }
        
    // -- Create code from template
    {
        console.log(`Creating code for parts 1 and 2...`)
        let dayTemplate = solutionTemplate()
        
        fs.writeFileSync(`${dir}/part1.js`, dayTemplate)
        fs.writeFileSync(`${dir}/part2.js`, dayTemplate)
    }
    
    // -- Create test file and add tests from template
    {
        let testPath = `./${year}/test.js`
        if (!fs.existsSync(testPath)) {
            console.log(`Creating test file...`)
            const testFileTemplate = testTemplate(year);
            fs.writeFileSync(testPath, testFileTemplate)
        }
        
        console.log(`Creating unit tests...`)
        let tests = fs.readFileSync(testPath, 'utf-8').split('\n')
        addTestsFromTemplate(tests, { year, day })
        fs.writeFileSync(testPath, tests.join('\n'))
    }

    console.log(chalk.green('Setup complete.'))
}