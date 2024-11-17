import _ from 'lodash'

export const metadata = {
    "Puzzle Name": "Squares With Three Sides"
}

const rot90 = (matrix) => _.map(matrix[0], (_, index) => matrix.map(row => row[index]).reverse())

export default function solution (input) {
    return _.chunk(input, 3).reduce((valid, chunk) => {
        let triangles = chunk.map(line => _.compact(_.split(line, ' ').map(x => parseInt(x, 10))))
        triangles = rot90(triangles)
        while (triangles.length > 0) {
            let [a, b, c] = triangles.shift()
            if (a + b > c && a + c > b && b + c > a) valid++
        }
        return valid
    }, 0)
} 
