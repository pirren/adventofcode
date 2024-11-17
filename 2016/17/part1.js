import { BFSTraversal } from './bfs-traversal.js'

export const metadata = {
    "Puzzle Name": "Two Steps Forward"
}

export default function solution (input) {
    let bfs = new BFSTraversal(input)
    return bfs.traverse([0, 0], [3, 3])
}