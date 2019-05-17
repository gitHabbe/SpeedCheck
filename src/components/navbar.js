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
                <NavbarItem href="/ttbox" name="TT Box" />
                <NavbarItem href="/images" name="Images" />
                <NavbarItem href="/types" name="TypeChart" />
            </ul>
        </div>
    );
};

export default Navbar;