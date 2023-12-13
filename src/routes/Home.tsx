/**
 * @file Contains functions related to rendering the current conditions.
 * @author Chad Chapman
 */
import React, { FC, useEffect, useState } from 'react';
import { Weather } from "../ts/Weather";


/**
 * @interface HomePageProps The interface that describes props
 * that are shared between components.
 */
interface HomePageProps {
    weather: Weather;
}

// useEffect(() => {
    
// })
// function foo(weather: Weather) {
//     try {
//         let haha = weather.getCityInfo();
//         return haha;
//     } catch (error) {
//         console.log(error);
//     }
// }

/**
 * Renders the current conditions forecast component.
 * @returns React.Fragment that contains the current conditions forecast 
 * component.
 */
const Home : FC<HomePageProps> = ({ weather }) => {
    const [city, setCity] = useState(Object);
    const [countryName, setCountry] = useState(Object);


    const setCityName = async () => {
        const cityName = await weather.getCityInfo();
        console.log(cityName);
        setCity(cityName);
    }

    const setCountryName = async () => {
        const countryName = await weather.getInitialCountryName();
        setCountry(countryName);
    }

    useEffect(() => {
        setCityName();
        setCountryName();
    });

    
    return (
        <>
            <h1>Home</h1>
            <p>City: {typeof city === 'string' ? city : null}</p>
            <p>Nation: {typeof countryName === 'string' ? countryName : null}</p>
        </> 
    )
};

export default Home;