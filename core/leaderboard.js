/**
 * leaderboard.js
 *
 * Description: Fetch and display the leaderboard for a given year
 */

import axios from 'axios'
import dotenv from 'dotenv'
import fs from 'fs'
import ttyTable from 'tty-table'

dotenv.config()
const { AOC_SESSION, LEADERBOARD_ID } = process.env

const header = [
    { value: 'Name', width: 30, headerColor: "cyan", align: "left" },
    { value: 'Score', width: 12, headerColor: "cyan" },
    { value: 'Stars', width: 12, headerColor: "cyan" },
    { value: '01', width: 4, headerColor: "cyan" },
    { value: '02', width: 4, headerColor: "cyan" },
    { value: '03', width: 4, headerColor: "cyan" },
    { value: '04', width: 4, headerColor: "cyan" },
    { value: '05', width: 4, headerColor: "cyan" },
    { value: '06', width: 4, headerColor: "cyan" },
    { value: '07', width: 4, headerColor: "cyan" },
    { value: '08', width: 4, headerColor: "cyan" },
    { value: '09', width: 4, headerColor: "cyan" },
    { value: '10', width: 4, headerColor: "cyan" },
    { value: '11', width: 4, headerColor: "cyan" },
    { value: '12', width: 4, headerColor: "cyan" },
    { value: '13', width: 4, headerColor: "cyan" },
    { value: '14', width: 4, headerColor: "cyan" },
    { value: '15', width: 4, headerColor: "cyan" },
    { value: '16', width: 4, headerColor: "cyan" },
    { value: '17', width: 4, headerColor: "cyan" },
    { value: '18', width: 4, headerColor: "cyan" },
    { value: '19', width: 4, headerColor: "cyan" },
    { value: '20', width: 4, headerColor: "cyan" },
    { value: '21', width: 4, headerColor: "cyan" },
    { value: '22', width: 4, headerColor: "cyan" },
    { value: '23', width: 4, headerColor: "cyan" },
    { value: '24', width: 4, headerColor: "cyan" },
    { value: '25', width: 4, headerColor: "cyan" },
];

const fetchLeaderboardDataAsync = async (year) => {
    let url = `https://adventofcode.com/${year}/leaderboard/private/view/${LEADERBOARD_ID}.json`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Cookie': `session=${AOC_SESSION}`
            }
        });
        return response.data
    } catch (error) {
        console.error('Error fetching leaderboard data:', error.message);
    }
}

const fetchAndCacheAsync = async (year, dir) => {
    let cache = await fetchLeaderboardDataAsync(year);
    cache.last_fetched = Date.now()
    fs.writeFileSync(`./${dir}/${LEADERBOARD_ID}_${year}.json`, JSON.stringify(cache))
    return cache
}

export default async function leaderboard(year) {
    if (!year) { 
        console.error('Year not provided. Provide a year as argument.')
        process.exit(1)
    }

    if (!AOC_SESSION) 
    {
        console.error('ERROR: AOC_SESSION is not defined. Please set it in the .env file.')
        process.exit(1)
    }
    if (!LEADERBOARD_ID) 
    {
        console.error('ERROR: LEADERBOARD_ID is not defined. Please set it in the .env file.')
        process.exit(1)
    }
    
    const transformData = (data) => {
        return Object.values(data.members)
            .filter(d => d.local_score > 0)
            .sort((a, b) => b.local_score - a.local_score)
            .reduce((grouped, player) => {
                let playerData = {
                    "Score": player.local_score,
                    "Stars": player.stars,
                    "Name": player.name
                }
                for (let i = 1; i <= 25; i++) {
                    playerData[`${String(i).padStart(2, '0')}`] = '-'
                }
                Object.entries(player.completion_day_level).forEach(([day, values]) => {
                    playerData[`${day.padStart(2, '0')}`] = Object.keys(values).length
                })  
    
                grouped.push(playerData)
                return grouped
            }, []) 
    }
    
    let dir = './leaderboard_cache'
    
    // Create cache folder if not exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    
    // Get cached data if exists
    let cache = fs.existsSync(`./${dir}/${LEADERBOARD_ID}_${year}.json`) ? JSON.parse(fs.readFileSync(`./${dir}/${LEADERBOARD_ID}_${year}.json`)) : [];
    
    if (cache.length === 0) {
        cache = await fetchAndCacheAsync(year, dir)
    } 
    else if (Math.abs(cache.last_fetched - Date.now()) > 15 * 60 * 1000) {
        // 15 minutes is required by Topaz(AOC) to wait between API calls
        console.log('Cached data is older than 15 minutes, fetching data...') 
        cache = await fetchAndCacheAsync(year, dir)
    }
    
    let playerData = transformData(cache)
    
    for (const item of header) {
        let isDay = /^([0-9]+)$/.exec(item.value)
        if (isDay) {
            item.formatter = function (value) {
                return (value === 2) 
                    ? this.style(value, "green", "bold") 
                    : value === 1 
                        ? this.style(value, "yellow", "bold")
                        : this.style(value, "gray", "bold")
            } 
        }
    }
    
    let table = ttyTable(header, playerData);
    console.log(table.render());
}