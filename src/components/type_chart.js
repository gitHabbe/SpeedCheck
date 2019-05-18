import React from 'react';
import logo from '../../habbeChart4.png';
// import "../../habbeChart2.png";
// console.log('asdf: ', asdf);

import style from '../style/style.css'

const TypeChart = () => {
    return (
        <div className={style.TypeChart}>
            <img src={logo} alt="Type Chart"/>
        </div>
    );
};

export default TypeChart