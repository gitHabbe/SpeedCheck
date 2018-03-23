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
        this.get_third_lap = this.get_third_lap.bind(this);

    }
    onChangeHandle(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    submitHandle(e) {
        e.preventDefault();
        const { lap1, lap2, final } = this.state;
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
                        disabled placeholder="Lap 3 time..." type="text" name="lap-3" />
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