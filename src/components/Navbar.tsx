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
 * Renders the navigation bar component.
 * @returns React.Fragment that contains the navigation bar.
 */
function Navbar() {
    const [click, setClick] = useState(false);

    /**
     * Calls the setClick function and sets click to false.
     * @returns boolean value when click is set to false.
     */
    const closeMobileMenu = () => setClick(false);

    /**
     * Responsible for handling clicks of the menu button.
     * @returns boolean value that is opposite of current value of click.
     */
    const handleClick = () => setClick(!click);

    return (
        <>
            <IconContext.Provider value={{color: "#fff"}}>
                <StyledNav>
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