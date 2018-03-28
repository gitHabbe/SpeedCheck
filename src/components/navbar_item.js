import React from 'react';
import { Link } from 'react-router-dom';
import style from '../style/style.css'

const NavbarItem = (props) => {
    return (
        <div className="navbar-item">
            <li><Link to={props.href}>{props.name}</Link></li>
        </div>
    );
};

export default NavbarItem;