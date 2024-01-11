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
        console.log("City Name: " + cityName);
        setCity(cityName);
    }

    const setCountryName = async () => {
        const countryName = await weather.getInitialCountryName();
        setCountry(countryName);
    }

    const setWeatherData = async () => {
        const cityData = await weather.getCityData(city);
        setData(cityData);
        console.log("foo: " + cityData.data);
    }

    useEffect(() => {
        setCityName();
        setCountryName();
        setWeatherData();
    }, []);

    
    return (
        <>
            <h1>Home</h1>
            <p>City: {typeof city === 'string' ? city : null}</p>
            <p>Nation: {typeof countryName === 'string' ? countryName : null}</p>
        </> 
    )
};

export default Home;