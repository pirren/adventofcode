import _ from 'lodash'
import { BFSTraversal } from './bfs-traversal.js'

export default function solution (input) {
    let bfs = new BFSTraversal(input)
    return bfs.traverse([0, 0], [3, 3], true)
}