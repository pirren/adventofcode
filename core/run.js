/**
 * run.js
 *
 * Description: Run the solution for a given year, day, and part.
 */

import _ from 'lodash'
import moment from 'moment'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from "url";

const log = console.log

export default async function runAsync({year = 2015, day = 1, part = 1, output = true } = {}) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const solutionFile = `part${part}.js`
    const inputFile = 'input.txt'

    const startTime = moment();

    const filePath = path.resolve(__dirname, `../${year}/`, `${String(day).padStart(2, '0')}`);

    let input = fs.readFileSync(path.resolve(filePath, inputFile), 'utf-8').trimEnd().split('\r\n')

    if (output) log(chalk.bgBlue(`Running ${year}.${day}.${part}`))
    let module = await import(pathToFileURL(path.resolve(filePath, solutionFile)))
    let answer = await module.default(input.length === 1 ? input[0] : input)

    if (output) {
        if (_.isObject(answer) || _.isArray(answer)) {
            log(`${year}.${day}.${part} answer:`)
            log(JSON.stringify(answer))
        } else {
            log(`${year}.${day}.${part} answer:\t\t`, answer)
        }
    }
    let endTime = moment()

    if (output) log(`${year}.${day}.${part} time: \t\t`, moment(endTime.diff(startTime)).format('mm:ss:SSSSS'))
    return answer
}