/**
 * @file Contains functions related to rendering the current conditions.
 * @author Chad Chapman
 */
import { DateTimeUtility } from '../ts/DateTimeUtility';
import { FC, useEffect, useState } from 'react';
import { Weather } from "../ts/Weather";


/**
 * @interface HomePageProps The interface that describes props
 * that are shared between components.
 */
interface HomePageProps {
    dateTimeUtility: DateTimeUtility;
    weather: Weather;
}


/**
 * Renders the current conditions forecast component.
 * @returns React.Fragment that contains the current conditions forecast 
 * component.
 */
const Home : FC<HomePageProps> = ({ dateTimeUtility, weather }) => {
    /**
     * @prop Name of city for current or remote location we are getting the 
     * weather forecast.
     */
    const [city, setCity] = useState(Object);

    /**
     * @prop Name of country where city is located.
     */
    const [country, setCountry] = useState(Object);

    /**
     * @prop Free tier data to display current conditions.
     */
    const [freeTierData, setFreeTierData] = useState("");

    /**
     * @prop One call tier data for displaying hourly and daily forecast.
     */
    const [oneCallData, setOneCallData] = useState("");

    /**
     * Sets state for current city.
     */
    const setCityName = async () => {
        const cityName = await weather.getCityInfo();
        setCity(cityName);
    }

    /**
     * Sets state for country for where current city is located.
     */
    const setCountryName = async () => {
        const countryName = await weather.getInitialCountryName();
        setCountry(countryName);
    }

    /**
     * Sets state for free tier data.
     */
    const setFreeTierWeatherData = async () => {
        const data = await weather.getJSONCityData();
        setFreeTierData(data);
    }

    /**
     * Sets state for one call tier data.
     */
    const setOneCallWeatherData = async () => {
        const data = await JSON.stringify(
            weather.getJSONDescriptiveWeatherData());
        setOneCallData(data);
    }

    useEffect(() => {
        setCityName();
        setCountryName();
        setFreeTierWeatherData(); 
        setOneCallWeatherData();
    }, []);

    
    return (
        <div className='clear-sky content'>
            <div className='forecast'>
                <h2 className='page-title'>Current conditions in {typeof city === 'string' ? city : null}</h2>
                <div className='current-conditions-container'>
                    <div className='current-conditions-left'>

                    </div>
                    <div className='current-conditions-right'></div>
                </div>             
            </div>
            <div className='forecast'>
                <h3>Free Tier Data</h3>
                <p>{typeof freeTierData === 'string' ? freeTierData : null}</p>
                <br></br>
                <h3>One Call Data</h3>
                <p>{typeof oneCallData === 'string' ? oneCallData : null}</p>
            </div>
        </div> 
    )
};

export default Home;