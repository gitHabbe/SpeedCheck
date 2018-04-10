import React from 'react';
import { Link } from 'react-router-dom';
import NavbarItem from './navbar_item.js'
import style from '../style/style.css';

const Navbar = () => {
    return (
        <div className={style.navbar}>
            <ul>
                <NavbarItem href="/" name="Home" />
                <NavbarItem href="/lap-calculator" name="Lap calculator" />
                <NavbarItem href="/speedcomp" name="Speed comparison" />
                <NavbarItem href="/paddyboard" name="PaddyBoard" />
                <NavbarItem href="/ttlb" name="TTBoard" />
            </ul>
        </div>
    );
};

export default Navbar;