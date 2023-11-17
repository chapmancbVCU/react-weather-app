/**
 * @file Contains functions related to rendering the navigation bar.
 * @author Chad Chapman
 */

import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiRocketThruster } from 'react-icons/gi';
import StyledNav from './Nav/Nav';


/**
 * 
 * @returns 
 */
function Navbar() {
    const [click, setClick] = useState(false);

    const closeMobileMenu = () => setClick(false);
    const handleClick = () => setClick(!click);

    return (
        <>
            <IconContext.Provider value={{color: "#fff"}}>
                <StyledNav className="navbar">
                    <div className="navbar-container container">
                        <Link to="/react-weather-app"
                            className="navbar-logo"
                            onClick={closeMobileMenu}>
                            <GiRocketThruster className="navbar-icon" />
                            Weather
                        </Link>
                        <div className="menu-icon" onClick={handleClick}>
                            { click ? <FaTimes /> : <FaBars /> }
                        </div>
                        <ul className={ click ? "nav-menu active" : "nav-menu"}>
                            <li className="nav-item">
                                <NavLink 
                                    to="/react-weather-app" 
                                    className={({ isActive } ) => 
                                        "nav-links" + (isActive ? " activated" : "")
                                        }
                                        onClick={closeMobileMenu}>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    to="/react-weather-app/daily" 
                                    className={({ isActive } ) => 
                                        "nav-links" + (isActive ? " activated" : "")
                                        }
                                        onClick={closeMobileMenu}>
                                    Daily
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    to="/react-weather-app/hourly" 
                                    className={({ isActive } ) => 
                                        "nav-links" + (isActive ? " activated" : "")
                                        }
                                        onClick={closeMobileMenu}>
                                    Hourly
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </StyledNav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar;