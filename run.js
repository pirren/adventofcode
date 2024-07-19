import _ from 'lodash'
import moment from 'moment'
import chalk from 'chalk'
import fs from 'fs'

const log = console.log

export default async function runAsync(year, day, part, output = true) {
    let url = `./${year}/${String(day).padStart(2, '0')}`
    let file = `part${part}.js`

    let startTime = moment();
    let input = fs.readFileSync(`${url}/input.txt`, 'utf-8').trimEnd().split('\r\n')
    if (output) log(chalk.bgBlue(`${url}/${file} running...`))
    let answer = (await import(`${url}/${file}`)).default(input.length === 1 ? input[0] : input)

    if (output) {
        if (_.isObject(answer) || _.isArray(answer)) {
            log(`${year}.${day}.${part} answer:`)
            log(JSON.stringify(answer))
        } else {
            log(`${year}.${day}.${part} answer:\t\t`, answer)
        }
    }
    let endTime = moment()

    if (output) log(`${year}.${day}.${part} time: \t\t\t`, moment(endTime.diff(startTime)).format('mm:ss:SSSSS'))
    return answer
}
