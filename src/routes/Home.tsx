/**
 * @file Contains functions related to rendering the current conditions.
 * @author Chad Chapman
 */
import React, { FC } from 'react';
import { Weather } from "../ts/Weather";


/**
 * @interface HomePageProps The interface that describes props
 * that are shared between components.
 */
interface HomePageProps {
    weather: Weather;
}


/**
 * Renders the current conditions forecast component.
 * @returns React.Fragment that contains the current conditions forecast 
 * component.
 */
const Home : FC<HomePageProps> = ({ weather }) => {
    let foo = weather.getAPI();
    console.log(foo);
    return (
        <>
            <div>Home {foo.getWeatherKey()}</div>
        </> 
    )
};

export default Home;