import React from 'react';
import style from '../style/style.css';

const TTBoxRow = (props) => {
    console.log(props.flag)
    return (
        <div className={style.TTBoxRowComp}>
            <span>
                <img 
                    className={style.TTBoxRowFlag}
                    src={"https://lipis.github.io/flag-icon-css/flags/4x3/" + props.flag + ".svg"} />
            </span>
            <span> #{props.rank}</span>
            <span className={style.TTBoxRowName}> - {props.name}</span>
            <br/>
            <div className={style.TTBoxRowTime}>{props.time}</div>
        </div>
    );
};

export default TTBoxRow;