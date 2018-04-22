import React, { Component } from 'react';

import style from '../style/style.css'
import fetching from '../util/fetching.js'
import dkr_levels from '../dkr_levels.json';
import util from '../util/time_to_string.js'

class TableRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            track: this.props.track,
            p1: this.props.p1,
            p2: this.props.p2
        }
    }

    setDifference() {
        let p1_style = {};
        let p2_style = {};
        let diff_style = {};
        let difference = this.props.difference

        if (difference > 0) {
            diff_style.color = 'red';
            p1_style.color = 'red';
            p2_style.color = 'green';
            difference = "+" + String(difference)
        } else if (difference < 0) {
            diff_style.color = 'green';
            p1_style.color = 'green';
            p2_style.color = 'red';
        }

        return (
            <tr>
                <td>{this.state.track}</td>
                <td style={p1_style}>{util.include_minutes(this.props.p1)}</td>
                <td style={p2_style}>{util.include_minutes(this.props.p2)}</td>
                <td style={diff_style}>{difference}</td>
            </tr>
        )
    }

    render() {
        return this.setDifference();
    }
};

export default TableRow;