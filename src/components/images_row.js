import React from 'react';

import util from '../util/time_to_string.js';
import styles from '../style/style.css'

const ImagesRow = (props) => {    

    let divStyle = {};
    if (props.track_num > 15) {
        divStyle.background = "linear-gradient(190deg, rgba(59,57,102,1) 0%, rgba(144,108,255,1) 0%, rgba(74,141,255,1) 100%)";        
    } else if (props.track_num > 11) {
        divStyle.background = "linear-gradient(190deg, rgba(59,57,102,1) 0%, rgba(255,107,3,1) 0%, rgba(48,189,0,1) 100%)";        
    } else if (props.track_num > 7) {
        divStyle.background = "linear-gradient(190deg, rgba(59,57,102,1) 0%, rgba(0,148,209,1) 0%, rgba(156,228,255,1) 100%)";
    } else if (props.track_num > 3) {
        divStyle.background = "linear-gradient(190deg, rgba(59,57,102,1) 0%, rgba(0,176,209,1) 0%, rgba(255,221,156,1) 100%)";
    } else {
        divStyle.background = "linear-gradient(190deg, rgba(59,57,102,1) 0%, rgba(209,109,0,1) 0%, rgba(226,251,11,1) 100%)";
    }

    return (
        <div id={props.track_num} className={styles.ImageRowComp} style={divStyle}>
            <div className={styles.ImageRowTrackName}>
                {props.track}
            </div>
            <span>
                <div className={styles.ImageRowPlace}>
                    Rank: {props.player_place}
                </div>
                <div className={styles.ImageRowTime}>
                    {util.include_minutes(props.player_time)}
                </div>
            </span>
        </div>
    );
};

export default ImagesRow;