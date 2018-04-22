import React from 'react';

import style from '../style/style.css';

const tt_level_info = (props) => {
    return (
        <div className={style.tt_box_comp}>
            <span>{props.rank} | .</span>
            <span>{props.name} | .</span>
            <span>{props.time}</span>
        </div>
    );
};

export default tt_level_info;