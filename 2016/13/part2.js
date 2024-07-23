import { BFSTraversal } from './bfs-traversal.js'

export default function solution (input) {
    let bfs = new BFSTraversal(input)
    return bfs.traverse([1,1], [], 50)
}
