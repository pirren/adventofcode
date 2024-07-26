import _ from 'lodash'
import { defaultDict } from '../../lib/dict.js'
import { Bot } from './bot.js'

export default function solution (input) {
    let targetChips = [17,61];
    let bots = defaultDict(x => new Bot(x))

    for (let line of input) {
        let match = /^value ([0-9]+) goes to bot ([0-9]+)$/.exec(line)
        if (match) {
            let [_, value, bot] = match
            bots[bot].putChip(Number(value))
        }

        match = /^bot ([0-9]+) gives low to (bot|output) ([0-9]+) and high to (bot|output) ([0-9]+)$/.exec(line)
        if (match) {
            let [_, bot, ltype, low, htype, high] = match
            bots[bot].ltype = ltype
            bots[bot].htype = htype
            bots[bot].low = Number(low)
            bots[bot].high = Number(high)
        }
    }

    let queue = Object.values(bots).filter(bot => bot.readyToPass()).map(bot => bot.id)
    while (queue.length > 0) {
        let bot = bots[queue.shift()]
        if (!bot.readyToPass()) {
            continue
        }
        if (bot.chips.every(chip => targetChips.includes(chip))) {
            return bot.id
        }
        if (bot.ltype === 'bot')
        {
            bots[bot.low].putChip(bot.chips[0])
            queue.push(bot.low)
        }
        if (bot.htype === 'bot')
        {
            bots[bot.high].putChip(bot.chips[1])
            queue.push(bot.high)
        }
    }
}