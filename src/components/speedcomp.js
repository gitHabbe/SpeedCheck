import React, { Component } from 'react';

import fetching from "./util/fetching.js";
import TableRow from '../components/table_row.js'
import style from '../style/style.css';

class SpeedComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player1: "habbe",
            player2: "nordicboa",
            player_list: [],
            row_components: [],
            total_diff: ""
        }

        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
    }
    
    onChangeHandle(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }
    
    async submitHandle(e) {
        e.preventDefault();
        this.setState({ player_list: [this.state.player1, this.state.player2] });
        const track_list = await fetching.fetch_track_names();
        const leaderboard_list = await fetching.fetch_track_times(track_list);
        console.log('leaderboard_list: ', leaderboard_list);
        let total_diff = 0;
        const tracks_and_times = await fetching.fetch_level_list_leaderboard(
            leaderboard_list, this.state.player1, this.state.player2);
        const rows = tracks_and_times.map((item, index) => {
            let p1_time = parseFloat(item.p1);
            let p2_time = parseFloat(item.p2);
            if (p1_time === 0) p1_time = p2_time * 2;
            if (p2_time === 0) p2_time = p1_time * 2;
            let difference = parseFloat((p1_time - p2_time).toFixed(2));
            total_diff += difference
            this.setState({ total_diff: (this.state.total_diff + difference)})
            return <TableRow key={index} track={item.track} p1={item.p1} p2={item.p2} difference={difference} />
        })
        this.setState({ row_components: rows })
        if (total_diff > 0) {
            let sentence = `${this.state.player_list[0]} is losing by +`
            this.setState({ total_diff: sentence + total_diff.toFixed(2)})
        } else {
            let sentence = `${this.state.player_list[0]} is winning by `
            this.setState({ total_diff: sentence + String(total_diff.toFixed(2))})
        }
        let total_diff_style = {}
        console.log(this.state.total_diff)
    }
    
    render() {
        return (
            <div>
                <form className={style.speedcompform}>
                    <input placeholder="Player 1 (you)" onChange={this.onChangeHandle} type="text" name="player1"/>
                    <input placeholder="Player 2" onChange={this.onChangeHandle} type="text" name="player2"/>
                    <button onClick={this.submitHandle}>Check</button>
                </form>
                <p className={style.total_difference}>{this.state.total_diff}</p>
                <table className={style.playertable}>
                    <tbody>
                        <tr key="header">
                            <th>Track</th>
                            <th>{this.state.player_list[0]}</th>
                            <th>{this.state.player_list[1]}</th>
                            <th>Delta</th>
                        </tr>
                        {this.state.row_components}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SpeedComp;