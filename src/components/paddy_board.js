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
            player_scores: [],
            paddy_row: []
        }

        this.sort_by_total_points = this.sort_by_total_points.bind(this);
        this.sort_by_atr_points = this.sort_by_atr_points.bind(this);
        this.sort_by_name = this.sort_by_name.bind(this);
    }

    async get_player_components(player_points) {
        let row_list = []
        player_points.forEach((player, index) => {
            row_list.push(<PaddyRow
                key={index}
                name={player.name}
                total_points={player.total_points}
                atr_points={player.atr_points} />)
        })
        this.setState({paddy_row: row_list})
    }
    
    sort_by_total_points(e) {
        e.preventDefault();
        let player_points = this.state.player_scores;
        function sort_total(a, b) {
            let comparison = 0;
            if (a.total_points > b.total_points) return comparison = -1;
            return comparison = 1;
        }
        player_points.sort(sort_total);
        this.get_player_components(player_points);

    }

    sort_by_atr_points(e) {
        e.preventDefault();
        let player_points = this.state.player_scores;
        function sort_atr(a, b) {
            let comparison = 0;
            if (a.atr_points > b.atr_points) return comparison = -1;
            return comparison = 1;
        }
        player_points.sort(sort_atr);
        this.get_player_components(player_points);
    }

    sort_by_name(e) {
        e.preventDefault();
        let player_points = this.state.player_scores;
        function sort_name(a, b) {
            let comparison = 0;
            if (a.name < b.name) return comparison = -1;
            return comparison = 1;
        }
        player_points.sort(sort_name);
        this.get_player_components(player_points);
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
        this.setState({player_scores: player_points})
        this.get_player_components(player_points);
        console.log('player_points: ', player_points);
        
    }

    render() {
        return (
            <div>
                <table className={style.playertable}>
                    <tbody>
                        <tr>
                            <th onClick={this.sort_by_name} className={style.table_title}>Name</th>
                            {/* <th>Name</th> */}
                            <th onClick={this.sort_by_total_points} className={style.table_title}>Points</th>
                            <th onClick={this.sort_by_atr_points} className={style.table_title}>ATR Points</th>
                        </tr>
                        {this.state.paddy_row}
                    </tbody>  
                </table>
            </div>
        );
    }
};

export default PaddyBoard;