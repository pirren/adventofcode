import solveCaptcha from './captcha.js'

export const metadata = {
    "Puzzle Name": "Inverse Captcha"
}

export default function solution (input) {
    return solveCaptcha(input, input.length / 2)
}
