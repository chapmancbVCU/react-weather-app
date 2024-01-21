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
    const [country, setCountry] = useState(Object);
    const [data, setData] = useState("");


    const setCityName = async () => {
        const cityName = await weather.getCityInfo();
        //console.log("City Name: " + cityName);
        setCity(cityName);
    }

    const setCountryName = async () => {
        const countryName = await weather.getInitialCountryName();
        setCountry(countryName);
    }

    const setWeatherData = async () => {
        //console.log(city);
        const cityData = await JSON.stringify(weather.getJSONCityData());
        setData(cityData);
        //console.log("foo: " + cityData.data.coord.lat); 
    }

    useEffect(() => {
        setCityName();
        setCountryName();
        setWeatherData();
        // console.log("foobar: " + data.data.coord.lat);  
    }, []);

    
    return (
        <>
            <h2 className='page-title'>Current conditions in {typeof city === 'string' ? city : null}</h2>
            <p>Nation: {typeof country === 'string' ? country : null}</p>
            <p>Lat: {typeof data === 'string' ? data : null}</p>
        </> 
    )
};

export default Home;