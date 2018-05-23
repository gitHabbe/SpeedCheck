import React, { Component } from 'react';
import domtoimage from 'dom-to-image';

import ImagesRow from './images_row.js';
import fetching from '../util/fetching.js';
import style from '../style/style.css';


class Images extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
        this.state = {
            runner: "",
            rows: []
        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleInputChange(e) {
        this.setState({ runner: e.target.value })
    }
    
    async handleButtonClick(e) {        
        e.preventDefault()
        const runner_id = await fetching.get_player_id(this.state.runner);
        const level_list = await fetching.fetch_track_names();
        // const level_list_data = await fetching.fetch_track_times(level_list.slice(0, 6));
        const level_list_data = await fetching.fetch_track_times(level_list);
        // console.log('level_list_data: ', level_list_data);
        const temp_list = level_list_data.map((track, index) => {
            let track_name = track.name.split("(")[0].slice(0, -1)
            
            let player_run = track.leaderboard.find(run => run.run.players[0].id == runner_id);
            // console.log('player_run: ', player_run);
            let player_time, player_place;
            if (!player_run) {
                player_time = "--";
                player_place = "?";
            } else {
                player_time = player_run.run.times.primary_t
                player_place = player_run.place 
            }
            return <ImagesRow
                reff={this.myRef}
                key={index}
                track_num={index}
                track={track_name}
                player_time={player_time} 
                player_place={player_place}
            />
        })
        this.setState({ rows: temp_list })
        const rowNodes = this.myRef.current.childNodes[2].childNodes;
        for (let i = 0; i < rowNodes.length; i++) {
            const element = rowNodes[i]
            domtoimage.toPng(element)
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                img.name = "test";
                document.querySelector("#rows").appendChild(img);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
        }
        setTimeout(function(){ 
            this.setState({rows: []})
        }.bind(this), 1000);
    }
    
    
    render() {
        return (
            <div ref={this.myRef} className={style.imagesComp}>
                <p><strong>After clicking on button, right-click on each image and click "Save image as..."</strong></p>
                <form action="">
                    <input
                        onChange={this.handleInputChange.bind(this)}
                        placeholder="Speedrunner name"
                        type="text"
                    />
                    <button onClick={this.handleButtonClick}>Generate pictures</button>
                </form>
                <div id="rows">
                    {this.state.rows}
                </div>
            </div>
        );
    }
}

export default Images;