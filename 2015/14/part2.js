import { fly, parse } from './fly.js'
import _ from 'lodash'

export default function solution (input) {
    let contestants = input.map(parse);
    let scores = new Array(contestants.length).fill(0);

    _.range(1, 2505).forEach(t => {
        contestants = contestants.map(contestant => fly({ time: t, contestant }));

        let max = Math.max(...contestants.map(c => c.distance));

        contestants.forEach((contestant, i) => {
            if(contestant.distance === max) {
                scores[i]++;
            }
        });
    });
    
    return Math.max(...scores);
}