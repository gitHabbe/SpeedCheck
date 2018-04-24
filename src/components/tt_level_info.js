import React from 'react';
import style from '../style/style.css';

const tt_level_info = (props) => {
    console.log(props.flag)
    return (
        <div className={style.tt_box_comp}>
            {/* <span className="flag-icon flag-icon-gr"></span> */}
            {/* <span className={"flag-icon flag-icon-" + props.flag}></span> */}
            <span>
                <img className={style.flag} src={"https://lipis.github.io/flag-icon-css/flags/4x3/" + props.flag + ".svg"} alt="Algeria Flag" />
            </span>
            <span> #{props.rank}</span>
            <span className={style.tt_box_name}> - {props.name}</span>
            <br/>
            <div className={style.tt_box_time}>{props.time}</div>
            {/* <hr/> */}
        </div>
    );
};

export default tt_level_info;