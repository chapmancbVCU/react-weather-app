/**
 * @file Contains functions related to rendering the navigation bar.
 * @author Chad Chapman
 */
import { auth } from '../helpers/firebaseHelper';
import { FaBars, FaGoogle, FaTimes } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { IconContext } from 'react-icons/lib';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiRocketThruster } from 'react-icons/gi';
import '../css/navbar.css';
import StyledNav from './Nav/Nav';
import StyledNavbarContainer from './NavbarContainer/NavbarContainer.styles';

/**
 * Renders the navigation bar component.
 * @returns JSX.Element that contains the navigation bar.
 */
function Navbar(): JSX.Element {

    const createWithGoogle = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential!.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    
    /**
     * @prop State of menu button.
     */
    const [click, setClick] = useState<boolean>(false);

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

    const user = auth.currentUser;

    return (
        <>
            <IconContext.Provider value={{color: "#fff"}}>
                <StyledNav>
                    <StyledNavbarContainer>
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
                            <li className="nav-item">
                                <NavLink 
                                    to="/react-weather-app/favorites" 
                                    className={({ isActive } ) => 
                                        "nav-links" + (isActive ? " activated" : "")
                                        }
                                        onClick={closeMobileMenu}>
                                    Favorites
                                </NavLink>
                            </li>
                            {/* <li className='login-button-content'>
                                <button className='login-button' onClick={createWithGoogle}>
                                    <FaGoogle />Login
                                </button>
                                <p>{user?.displayName}</p>
                            </li> */}
                        </ul>
                    </StyledNavbarContainer>
                </StyledNav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar;