/**
 * @file Contains functions related to rendering the current conditions.
 * @author Chad Chapman
 */
import { FC, useEffect, useState } from 'react';
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
    /**
     * @prop Name of city for current or remote location we are getting the 
     * weather forecast.
     */
    const [city, setCity] = useState(Object);
    const [countryName, setCountry] = useState(Object);
    const [data, setData] = useState([]);


    const setCityName = async () => {
        const cityName = await weather.getCityInfo();
        console.log(cityName);
        setCity(cityName);
    }

    const setCountryName = async () => {
        const countryName = await weather.getInitialCountryName();
        setCountry(countryName);
    }

    const setWeatherData = async () => {
        // fetch('http://localhost:3000/api' )
        //     .then(response => response.json())
        //     .then(res => {
        //         if(res && res.data) {
        //             console.log(res.data);
        //         }
        //     })
        // const res = await fetch('http://localhost:3000/api?type=simple&&foo=bar');
        // const data = await res.json();
        // console.log(data.data);
    }

    useEffect(() => {
        setWeatherData();
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