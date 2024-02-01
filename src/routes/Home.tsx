/**
 * @file Contains functions related to rendering the current conditions.
 * @author Chad Chapman
 */
import { DateTimeUtility } from '../ts/DateTimeUtility';
import '../css/currentConditions.css';
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
 * @returns JSX.Element that contains the current conditions forecast 
 * component.
 */
const Home : FC<HomePageProps> = ({ weather }): JSX.Element => {
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
    const [freeTierData, setFreeTierData] = useState<any>();

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
    const setFreeTierWeatherData =  () => {
        const data = weather.getJSONCityData();
        setFreeTierData(data);
        console.log(freeTierData);
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
                <p>{typeof country === 'string' ? country : null}</p>
                <div className='current-conditions-container'>
                    <div className='current-conditions-left'>

                    </div>
                    <div className='current-conditions-right'></div>
                </div>             
            </div>
            <div className='forecast'>
                <h3>Free Tier Data</h3>
                <p>clouds: {freeTierData && freeTierData.clouds.all}</p>
                <p>cod: {freeTierData && freeTierData.cod}</p>
                <p>coord: Lat={freeTierData && freeTierData.coord.lat}, Lon={freeTierData && freeTierData.coord.lon}</p>
                <p>dt: {freeTierData && freeTierData.dt}</p>
                <p>id: {freeTierData && freeTierData.id}</p>
                <br></br>
                <h4>main:</h4>
                <p>feels_like: {freeTierData && freeTierData.main.feels_like}</p>
                <p>humidity: {freeTierData && freeTierData.main.humidity}</p>
                <p>pressure: {freeTierData && freeTierData.main.pressure}</p>
                <p>temp: {freeTierData && freeTierData.main.temp}</p>
                <p>temp_max: {freeTierData && freeTierData.main.temp_max}</p>
                <p>temp_min: {freeTierData && freeTierData.main.temp_min}</p>
                <p>name: {freeTierData && freeTierData.name}</p>
                <br></br>
                <h4>sys:</h4>
                <p>country: {freeTierData && freeTierData.sys.country}</p>
                <p>id: {freeTierData && freeTierData.sys.id}</p>
                <p>sunrise: {freeTierData && freeTierData.sys.sunrise}</p>
                <p>sunset: {freeTierData && freeTierData.sys.sunset}</p>
                <p>type: {freeTierData && freeTierData.sys.type}</p>
                <br></br>
                <p>timezone: {freeTierData && freeTierData.timezone}</p>
                <p>visibility: {freeTierData && freeTierData.visibility}</p>
                <br></br>
                <h4>weather: Array[1]</h4>
                <p>description: {freeTierData && freeTierData.weather[0].description}</p>
                <p>icon: {freeTierData && freeTierData.weather[0].icon}</p>
                <p>id: {freeTierData && freeTierData.weather[0].id}</p>
                <p>main: {freeTierData && freeTierData.weather[0].main}</p>
                <br></br>
                <h4>wind:</h4>
                <p>deg: {freeTierData && freeTierData.wind.deg}</p>
                <p>gust: {freeTierData && freeTierData.wind.gust}</p>
                <p>speed: {freeTierData && freeTierData.wind.speed}</p>
                <hr></hr>
                <h3>One Call Data</h3>
                <p>{typeof oneCallData === 'string' ? oneCallData : null}</p>
            </div>
        </div> 
    )
};

export default Home;