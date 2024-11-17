import { BFSTraversal } from './bfs-traversal.js'

export const metadata = {
    "Puzzle Name": "A Maze of Twisty Little Cubicles"
}

export default function solution (input) {
    let bfs = new BFSTraversal(input)
    return bfs.traverse([1,1], [31,39])
}