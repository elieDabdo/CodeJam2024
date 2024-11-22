
import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-main">
                <div className="name">
                    <Link to="/Codejam"><h2>My Trainer</h2></Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
