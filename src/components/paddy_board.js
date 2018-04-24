import React, { Component } from 'react';

import fetching from '../util/fetching';
import style from '../style/style.css';
import PaddyRow from './paddy_row.js';
import contenders from '../contenders.json';
import dkr_levels from '../dkr_levels.json';

class PaddyBoard extends Component {
    constructor(props){
        super(props)

        this.state = {
            player_scores: [],
            paddy_rows: []
        }

        this.sort_by_points = this.sort_by_points.bind(this);
        this.sort_by_name = this.sort_by_name.bind(this);
    }

    async get_player_components(player_points) {
        let row_list = []
        player_points.forEach((player, index) => {
            console.log(player)
            row_list.push(<PaddyRow
                key={index}
                name={player.name}
                total_points={player.total_points}
                atr_points={player.atr_points}
                car_points={player.car_points}
                hover_points={player.hover_points}
                plane_points={player.plane_points}
                car_wrs_count={player.car_wrs_count}
                hover_wrs_count={player.hover_wrs_count}
                plane_wrs_count={player.plane_wrs_count}
                total_wrs_count={player.total_wrs_count}
                />)
        })
        this.setState({paddy_rows: row_list})
    }
    
    sort_by_points(e) {
        e.preventDefault();
        console.log(e.target.getAttribute("obj_prop"));
        let player_points = this.state.player_scores;
        function sort_total(a, b) {
            let comparison = 0;
            let attribute_name = e.target.getAttribute("obj_prop")
            if (a[attribute_name] > b[attribute_name]) return comparison = -1;
            return comparison = 1;
        }
        player_points.sort(sort_total);
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
            return { 
                name: player.name,
                id: player.id,
                total_points: 0,
                atr_points: 0,
                car_points: 0,
                hover_points: 0,
                plane_points: 0,
                car_wrs_count: 0,
                hover_wrs_count: 0,
                plane_wrs_count: 0,
                total_wrs_count: 0
            }
        })
        const track_list = await fetching.fetch_track_names();
        console.log('track_list: ', track_list);
        const top_10 = await fetching.fetch_top10_tracks(track_list);
        // array of 3 track, each have a leaderboard, leaderboard is array of 10 runs
        top_10.forEach(track => {
            track.leaderboard.forEach((run, index) => {
                player_points.forEach((player, index2) => {
                    if (player.id === run.run.players[0].id) {
                        if (dkr_levels.run_levels.find(level => level.id === track.id)) {
                            player_points[index2].atr_points += (10 - index)
                        }
                        player_points[index2].total_points += (10 - index)
                        
                        
                        if (index === 0) {
                            player_points[index2].total_wrs_count += 1;
                        }
                        if (track.name.includes("(car)")) {
                            player_points[index2].car_points += (10 - index)
                            if (index === 0) player_points[index2].car_wrs_count += 1;
                        }
                        if (track.name.includes("(hover)")) {
                            player_points[index2].hover_points += (10 - index)
                            if (index === 0) player_points[index2].hover_wrs_count += 1;
                        }
                        if (track.name.includes("(plane)")) {
                            player_points[index2].plane_points += (10 - index)
                            if (index === 0) player_points[index2].plane_wrs_count += 1;
                        }
                    }
                })
            })
        })

        this.setState({player_scores: player_points})
        this.get_player_components(player_points);
    }


    render() {
        return (
            <div className={style.SpeedCompComp}>
                <table >
                    <tbody>
                        <tr>
                            <th onClick={this.sort_by_name} attribute="asdf" className={style.table_title}>Name</th>
                            <th obj_prop="total_points" onClick={this.sort_by_points} className={style.table_title}>All</th>
                            <th obj_prop="atr_points" onClick={this.sort_by_points} className={style.table_title}>ATR</th>
                            <th obj_prop="car_points" onClick={this.sort_by_points} className={style.table_title}>Car</th>
                            <th obj_prop="hover_points" onClick={this.sort_by_points} className={style.table_title}>Hover</th>
                            <th obj_prop="plane_points" onClick={this.sort_by_points} className={style.table_title}>Plane</th>
                            <th obj_prop="car_wrs_count" onClick={this.sort_by_points} className={style.table_title}>CarWR</th>
                            <th obj_prop="hover_wrs_count" onClick={this.sort_by_points} className={style.table_title}>PlaneWR</th>
                            <th obj_prop="plane_wrs_count" onClick={this.sort_by_points} className={style.table_title}>PlaneWR</th>
                            <th obj_prop="total_wrs_count" onClick={this.sort_by_points} className={style.table_title}>TotalWR</th>
                        </tr>
                        {this.state.paddy_rows}
                    </tbody>  
                </table>
            </div>
        );
    }
};

export default PaddyBoard;