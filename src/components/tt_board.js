import React, { Component } from 'react';

import fetching from './util/fetching.js';
import TrackOption from './track_option.js';

class TTBoard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            test: 'test'
        }

    }

    async get_track() {
        const test = await fetching.fetch_dkr64_track_wr('ancient-lake', 'car', '3')
        console.log(test)
    }
    render() {
        this.get_track()
        return (
            <div>
                <form action=""></form>
                <select name="select-track" id="">
                </select>
            </div>
        );
    }
}


export default TTBoard;