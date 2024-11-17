import { allowedIPs } from './blacklist.js'

export const metadata = {
    "Puzzle Name": "Firewall Rules"
}

export default function solution (input) {
    return allowedIPs(input, false)
}