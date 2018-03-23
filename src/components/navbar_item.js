import React from 'react';
import { Link } from 'react-router-dom';
import style from '../style/style.css'

const NavbarItem = (props) => {
    return (
        <div className="navbar-item">
            <Link to={props.href}>{props.name}</Link>
        </div>
    );
};

export default NavbarItem;