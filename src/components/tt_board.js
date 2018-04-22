import React, { Component } from 'react';
import TT_Info from './tt_level_info.js';
import style from '../style/style.css';

import fetching from '../util/fetching.js';
import TrackOption from './track_option.js';
import dkr_levels from '../dkr_levels.json';

class TTBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level_list: [],
            current_level: 'Ancient Lake',
            current_vehicle: 'car',
            current_laps: '3',
            component_list: []
        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleLevelSelectChange = this.handleLevelSelectChange.bind(this)
        this.handleVehicleSelectChange = this.handleVehicleSelectChange.bind(this)
        this.handleLapsSelectChange = this.handleLapsSelectChange.bind(this)
        

    }

    async handleButtonClick(e) {
        e.preventDefault();
        // format track-name correctly
        let track = this.state.current_level.toLowerCase().split(' ').join('-')
        let asdf = []
        const test = await fetching.fetch_dkr64_track_wr(
            track,
            this.state.current_vehicle,
            this.state.current_laps
        )
        console.log(test.data.times);
        
        asdf = test.data.times.map((res, index) => {
            return <TT_Info key={index} rank={res.ranking} name={res.player_name} time={res.time} />
        })
        this.setState({ component_list: asdf })
    }
    
    handleLevelSelectChange(e) {
        this.setState({ current_level: e.target.value })
    }

    handleVehicleSelectChange(e) {
        this.setState({ current_vehicle: e.target.value })
    }

    handleLapsSelectChange(e) {
        this.setState({ current_laps: e.target.value })
    }

    componentDidMount() {
        const levels = dkr_levels.run_levels.map(level => {
            //remove vehicle from level-name
            const level_as_list = level.name.replace(/[\(\)]/g, '').split(' ')
            return level_as_list.slice(0, level_as_list.length - 1).join(' ')
        })
        this.setState({ level_list: levels })
    }
    
    render() {
        return (
            <div className={style.tt_box}>
                <form action="">
                    <select name="levels" onChange={this.handleLevelSelectChange}>
                        {this.state.level_list.map((level, index) => <option key={index}value={level}>{level}</option>)}
                    </select>
                    <br />
                    <br />
                    <select name="vehicle" value={this.current_vehicle} onChange={this.handleVehicleSelectChange}>
                        <option value="car">car</option>
                        <option value="hover">Hover</option>
                        <option value="plane">Plane</option>
                    </select>
                    <select name="laps" onChange={this.handleLapsSelectChange}>
                        <option value="3">3</option>
                        <option value="1">1</option>
                    </select>
                    <input onClick={this.handleButtonClick} type="submit" />
                </form>
                {this.state.component_list}
            </div>
        );
    }
}

export default TTBoard;