import React, { Component } from 'react';

import style from '../style/style.css';

class LapCalculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lap1: '',
            lap2: '',
            final: '',
            lap3: ''
        }

        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.submitHandle = this.submitHandle.bind(this);

    }

    format_lap(lap) {
        let new_lap = lap;
        if (new_lap.indexOf(",") > -1) new_lap = new_lap.replace(",", ".");
        if (new_lap.indexOf(":") > -1) new_lap = new_lap.replace(":", ".");
        if (new_lap.indexOf("\"") > -1) new_lap = new_lap.replace("\"", ".");
        if (new_lap.indexOf(".") === -1) new_lap += ".00";
        return parseFloat(new_lap);
    }

    onChangeHandle(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    
    submitHandle(e) {
        e.preventDefault();
        const { lap1, lap2, final } = this.state;
        let formated_lap1 = this.format_lap(lap1);
        let formated_lap2 = this.format_lap(lap2);
        let formated_final = this.format_lap(final);

        const lap3 = (formated_final - formated_lap2 - formated_lap1).toFixed(2);

        this.setState({lap3: lap3})
    }

    render() {
        return (
            <div>
                <form className={style.calculatorform}>
                    <input 
                        onChange={this.onChangeHandle}
                        placeholder="Lap 1 time..." type="text" name="lap1" />
                    <input 
                        onChange={this.onChangeHandle}
                        placeholder="Lap 2 time..." type="text" name="lap2" />
                    <input 
                        disabled placeholder="Lap 3 time..." type="text" name="lap-3"
                        value={this.state.lap3}/>
                    <input 
                        onChange={this.onChangeHandle}
                        placeholder="Final time..." type="text" name="final" />
                    <button onClick={this.submitHandle}>Get time</button>
                </form>     
            </div>
        );
    }
};

export default LapCalculator;