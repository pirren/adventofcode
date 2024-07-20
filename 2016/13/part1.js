import { BFSTraversal} from './BFSTraversal.js'

export default function solution (input) {
    let bfs = new BFSTraversal(input)
    return bfs.traverse([1,1], [31,39])
}