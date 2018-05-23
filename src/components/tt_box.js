import React, { Component } from 'react';
import TTBoxRow from './tt_box_row.js';
import style from '../style/style.css';

import fetching from '../util/fetching.js';
import TrackOption from './track_option.js';
import dkr_levels from '../dkr_levels.json';

class TTBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level_list: [],
            current_level: 'Ancient Lake',
            current_vehicle: 'car',
            current_laps: '3',
            current_span: [1, 5],
            TTBox_rows: []
        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleLevelSelectChange = this.handleLevelSelectChange.bind(this)
        this.handleVehicleInputChange = this.handleVehicleInputChange.bind(this)
        this.handleLapsInputChange = this.handleLapsInputChange.bind(this)
        this.handleSpanInputChange = this.handleSpanInputChange.bind(this)
        this.handleSpanInputChange2 = this.handleSpanInputChange2.bind(this)
    }
    
    async handleButtonClick(e) {
        e.preventDefault();
        // format track-name correctly
        let track = this.state.current_level.toLowerCase().split(' ').join('-')
        let asdf = []
        const test = await fetching.fetch_dkr64_track_wr(
            track,
            this.state.current_vehicle,
            this.state.current_laps,
            this.state.current_span[1]
        )
        // console.log(test.data.times);
        
        asdf = test.data.times.slice(this.state.current_span[0] - 1).map((res, index) => {
            return <TTBoxRow key={index} rank={res.ranking} name={res.player_name} time={res.time} flag={res.country_iso.toLowerCase()} />
        })
        this.setState({ TTBox_rows: asdf })
    }
    
    handleLevelSelectChange(e) {
        this.setState({ current_level: e.target.value })
    }

    handleVehicleInputChange(e) {
        // console.log('e.target.value: ', e.target.value);
        this.setState({ current_vehicle: e.target.value })
    }

    handleLapsInputChange(e) {
        this.setState({ current_laps: e.target.value })
        // console.log('e.target.value: ', e.target.value);
    }
    
    handleSpanInputChange(e) {
        let list_values = [e.target.value, this.state.current_span[1]]
        this.setState({ current_span: list_values })
        // console.log('e.target.value: ', e.target.value);
    }
    handleSpanInputChange2(e) {
        let list_values = [this.state.current_span[0], e.target.value]
        this.setState({ current_span: list_values })
        // console.log('e.target.value: ', e.target.value);
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
            <div className={style.TTBoxComp}>
                <p>Printscreen black box for stream overlay</p>
                <form action="">
                    <select name="levels" onChange={this.handleLevelSelectChange}>
                        {this.state.level_list.map((level, index) => <option key={index} value={level}>{level}</option>)}
                    </select>
                    <div className={style.TTBoxVehicleInput}>
                        <input
                            type="radio"
                            name="vehicle"
                            value="car"
                            onChange={this.handleVehicleInputChange} />Car
                        <input
                            type="radio"
                            name="vehicle"
                            value="hover"
                            onChange={this.handleVehicleInputChange} />Hover
                        <input
                            type="radio"
                            name="vehicle"
                            value="plane"
                            onChange={this.handleVehicleInputChange} />Plane
                    </div>
                    <div className={style.TTBoxLapsInput}>
                        <span>Laps: </span>
                        <input
                            type="radio"
                            name="laps"
                            value="3"
                            onChange={this.handleLapsInputChange} />3
                        <input
                            type="radio"
                            name="laps"
                            value="1"
                            onChange={this.handleLapsInputChange} />1
                    </div>
                    <div className={style.TTBoxPlaceSpan}>
                        <span>
                            Place&nbsp;
                        </span>
                        <span className={style.TTBoxRowNumSpan}>
                            #<input type="number" name="span1" step="1" value={this.state.current_span[0]} onChange={this.handleSpanInputChange} />
                        </span>
                        &nbsp;to&nbsp;
                        <span className={style.TTBoxRowNumSpan}>
                            #<input type="number" name="span2" step="1" value={this.state.current_span[1]} onChange={this.handleSpanInputChange2} />
                        </span>
                        <button onClick={this.handleButtonClick} type="submit">Search</button>
                    </div>
                </form>
                <div className={style.TTBoxWrapper}>
                    {this.state.TTBox_rows}
                </div>
            </div>
        );
    }
}

export default TTBox;