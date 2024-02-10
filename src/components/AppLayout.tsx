/**
 * @file Sets general layout for the application.
 * @author Chad Chapman
 */
import {FC} from 'react';
import Navbar from "./Navbar"
import { Outlet, } from 'react-router-dom';
import SearchBar from "./SearchBar";
import { Weather } from "../ts/Weather";

interface AppLayoutProps {
    weather: Weather
}
/**
 * Renders the Navbar and Outlet components.
 * @returns JSX.Element that contains general layout for the page.
 */
const AppLayout : FC<AppLayoutProps> = ({weather}): JSX.Element => {
    return (
        <>
            <Navbar />
            <SearchBar weather={weather}/>
            <Outlet />
        </>
    )
}

export default AppLayout;