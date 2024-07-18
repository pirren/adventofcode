import _ from 'lodash'
import fs from 'fs'
import chalk from 'chalk'


let [year, day] = [2016, 2, 1] // todo: default

let args = _.compact([process.argv[2], process.argv[3]])
if (args.length === 2) {
    [year, day] = args
} else if (args.length === 1) {
    [day] = args
} 
// else {
//     day++
// }
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

// Create code
console.log(`Creating code for parts 1 and 2...`)
let func = `import _ from 'lodash'\n\nexport default function solution (input) {\n    return input\n}`

fs.writeFileSync(`${dir}/part1.js`, func)
fs.writeFileSync(`${dir}/part2.js`, func)

// Create tests
let testPath = `./${year}/test.js`
if (fs.existsSync(testPath)) {
    console.log(`Creating unit tests...`)
    let tests = fs.readFileSync(testPath, 'utf-8').split('\n')
    tests.splice(tests.length - 1, 0, 
        `    it('day ${dayFormatted}, part 1', () => test(${day}, 1, 12345))`,
        `    it('day ${dayFormatted}, part 2', () => test(${day}, 2, 12345))`
    )
    fs.writeFileSync(testPath, tests.join('\n'))
}
console.log('Done.')
