import React from 'react';
import { Link } from 'react-router-dom';
import NavbarItem from './navbar_item.js'
import style from '../style/style.css';

const Navbar = () => {
    return (
        <div className={style.navbar}>
            <ul>
                <li><NavbarItem href="/" name="Home" /></li>
                <li><NavbarItem href="/lap-calculator" name="Lap calculator" /></li>
                <li><NavbarItem href="speedcomp" name="Speed comparison" /></li>
            </ul>
        </div>
    );
};

export default Navbar;