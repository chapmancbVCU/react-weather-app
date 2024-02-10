/**
 * @file Sets general layout for the application.
 * @author Chad Chapman
 */
import {FC} from 'react';
import Navbar from "./Navbar"
import { Outlet, } from 'react-router-dom';
import { Weather } from "../ts/Weather";

interface AppLayoutProps {
    weather: Weather
}
/**
 * Renders the Navbar and Outlet components.
 * @returns JSX.Element that contains general layout for the page.
 */
function AppLayout(): JSX.Element {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default AppLayout;