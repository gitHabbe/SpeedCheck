import React, { Component } from 'react';

import fetching from './util/fetching';
import style from '../style/style.css';
import PaddyRow from './paddy_row.js';
import contenders from '../contenders.json';
import dkr_levels from '../dkr_levels.json';

class PaddyBoard extends Component {
    constructor(props){
        super(props)

        this.state = {
            paddy_row: []
        }
    }


    async get_player_components(player_points) {
        function sort_total(a, b) {
            let comparison = 0;
            if (a.total_points > b.total_points) {
                return comparison = -1;
            }
            return comparison = 1;
        }
        let test2 = player_points.sort(sort_total)
        console.log('test2: ', test2);
        let test = []
        player_points.forEach((player, index) => {
            test.push(<PaddyRow
                key={index}
                name={player.name}
                total_points={player.total_points}
                atr_points={player.atr_points}
                 />)
        })
        this.setState({paddy_row: test})
    }
    
    async componentDidMount() {
        let player_points = contenders.contenders.map(player => { 
            return { name: player.name, id: player.id, atr_points: 0, total_points: 0 }
        })
        const track_list = await fetching.fetch_track_names();
        console.log('track_list: ', track_list);
        const top_10 = await fetching.fetch_top10_tracks(track_list);
        top_10.forEach(track => {
            track.leaderboard.forEach((run, index) => {
                player_points.forEach((player, index2) => {
                    if (player.id === run.run.players[0].id) {
                        if (dkr_levels.run_levels.find(level => level.id === track.id)) {
                            player_points[index2].atr_points += (10 - index)
                        }
                        player_points[index2].total_points += (10 - index)
                    }
                })
            })
        })
        this.get_player_components(player_points);
        console.log('player_points: ', player_points);
        
    }

    render() {
        return (
            <div>
                <table className={style.playertable}>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Points</th>
                            <th>ATR Points</th>
                        </tr>
                    {this.state.paddy_row}
                    </tbody>  
                </table>
            </div>
        );
    }
};

export default PaddyBoard;