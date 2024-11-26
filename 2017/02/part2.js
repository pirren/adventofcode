export const metadata = {
    "Puzzle Name": "Corruption Checksum"
}

export default function solution (input) {
    // let spreadsheet = 

    return input
        .map(line => line.match(/([0-9]+)/g).map(Number))
        .reduce((sum, line) => {
            for (let i = 0; i < line.length; i++) {
                let number = line[i]
                let divisible = line.find((other, index) => index != i && number % other == 0)
                
                if (!divisible) 
                    continue

                return sum + number / divisible
            }
        }, 0)
}