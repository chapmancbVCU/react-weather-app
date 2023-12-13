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
    useEffect(() => {
        foo();
    })
    const [city, setCity] = useState(Object);
    const foo = async () => {
        const temp = await weather.getCityInfo();
        console.log(temp);
        setCity(temp);
    }

    return (
        <>
            <div>Home</div>
            {typeof city === 'string' ? city : null}
        </> 
    )
};

export default Home;