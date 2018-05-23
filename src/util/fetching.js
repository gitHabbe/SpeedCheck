import axios from "axios";

import dkr_levels from '../dkr_levels.json';
/**
 * Fetching src uri
 * 
 * @param {string} uri 
 * @returns promise
 */
function fetch_uri(uri) {
    return axios.get(uri)
};

/**
 * @param {string} name 
 * @returns promise
 */
function fetch_player(name) {
    // return axios.get(`https://www.speedrun.com/api/v1/games/9dow9e1p/levels`)
    return axios.get(`https://www.speedrun.com/api/v1/users?name=${name}`)
};

/**
 * src name to player ID
 * 
 * @param {any} name 
 * @returns {int} id
 */
async function get_player_id(name) {
    let player = await fetch_player(name);
    return player.data.data[0].id;
};

function fetch_level_list() {
    return axios.get("https://www.speedrun.com/api/v1/games/9dow9e1p/levels")
};

/**
 * @returns {array} w/ { name, id, uri }
 */
async function fetch_track_names() {
    const level_list = await fetch_level_list()
    const expanded_level_list = level_list.data.data.map(level => {
        const leaderboard_link = level.links.find(link => link.rel === 'leaderboard')
        return {
            name: level.name,
            id: level.id,
            leaderboard_uri: leaderboard_link.uri
        }
    })
    
    return expanded_level_list;
    // return expanded_level_list.slice(0, 3);
};
/**
 * get long or short leaderboard
 * 
 * @param {array} list list with { name, id, uri }
 * @param {boolean} [limited=true] 
 * @returns {array} list expanded with leaderboard
 */
async function fetch_track_times(list, limited = true) {
    let track_list = []
    for (let i = 0; i < list.length; i++) {
    // for (let i = 0; i < 3; i++) {
        const element = list[i];
        if (!limited || dkr_levels.run_levels.find(track => track.name === element.name)) {
            const track = await fetch_uri(element.leaderboard_uri);
            element.leaderboard = track.data.data.runs;
            track_list.push(element)
        }
    }
    return track_list;
}

async function fetch_top10_tracks(list) {
    let track_list = []
    for (let i = 0; i < list.length; i++) {
    // for (let i = 0; i < 3; i++) {
        const element = list[i];
        const track = await fetch_uri(element.leaderboard_uri + "?top=10");
        element.leaderboard = track.data.data.runs;
        track_list.push(element)
    }
    return track_list;
}

/**
 * Grab player1 and player2's time + track name
 * 
 * @param {array} track_list list of name, id, uri, leaderboard
 * @param {string} player1 
 * @param {string} player2 
 * @returns {array} [trackname, p1time, p2time]
 */
async function fetch_level_list_leaderboard(track_list, player1, player2) {
    const player1_id = await get_player_id(player1);
    const player2_id = await get_player_id(player2);
    
    let temp_time_p1;
    let temp_time_p2;
    let track_and_times = [];
    for (let i = 0; i < track_list.length; i++) {
    // for (let i = 0; i < 3; i++) {
        const element = track_list[i];
        temp_time_p1 = 0;
        temp_time_p2 = 0;
        element.leaderboard.forEach(run => {
            if (run.run.players[0].id == player1_id) {
                temp_time_p1 = run.run.times.primary_t;
            } 
            if (run.run.players[0].id == player2_id) {
                temp_time_p2 = run.run.times.primary_t;
            }
        })
        track_and_times.push({ track: element.name, p1: temp_time_p1, p2: temp_time_p2 })
    }
    // console.log('track_and_times: ', track_and_times);
    return track_and_times;
};
    
async function fetch_dkr64_track_wr(track, vehicle, laps, limit) {
    // return axios.get(`https://www.dkr64.com/api/world_record?api_token=${process.env.DKR64_API_TOKEN}&track=${track}&vehicle=${vehicle}&type=standard&laps=${laps}`)
    return axios.get(`https://www.dkr64.com/api/times?api_token=${process.env.DKR64_API_TOKEN}&track=${track}&vehicle=${vehicle}&type=standard&laps=${laps}&limit=${limit}`);
}

module.exports = {
    fetch_level_list_leaderboard: fetch_level_list_leaderboard,
    fetch_track_names: fetch_track_names,
    fetch_track_times: fetch_track_times,
    get_player_id: get_player_id,
    fetch_top10_tracks: fetch_top10_tracks,
    fetch_track_names: fetch_track_names,
    fetch_dkr64_track_wr: fetch_dkr64_track_wr
}