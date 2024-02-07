/**
 * @file Contains functions related to rendering the current conditions.
 * @author Chad Chapman
 */
import { DateTimeUtility } from '../ts/DateTimeUtility';
import '../css/currentConditions.css';
import { FC, useState, useEffect } from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import { Weather } from "../ts/Weather";


/**
 * @interface HomePageProps The interface that describes props that are shared 
 * between components.
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
const Home : FC<HomePageProps> = ({ dateTimeUtility, weather }): JSX.Element => {
    /**
     * @prop Name of city for current or remote location we are getting the 
     * weather forecast.
     */
    const [city, setCity] = useState(Object);

    /**
     * @prop for date in the following format: 
     * <day_of_week>, <month> <day_of_month>, <year>.
     */
    const [date, setDate] = useState<string>("");

    /**
     * @prop Name of country where city is located.
     */
    const [country, setCountry] = useState(Object);

    /**
     * @prop Property for feels like temperature.
     */
    const [feelsLikeTemperature, setFeelsLikeTemperature] = useState<string>("")

    /**
     * @prop Free tier data to display current conditions.
     */
    const [freeTierData, setFreeTierData] = useState<any>();

    const [highTemperature, setHighTemperature] = useState<number>();
    const [lowTemperature, setLowTemperature] = useState<number>();
    /**
     * @prop One call tier data for displaying hourly and daily forecast.
     */
    const [oneCallData, setOneCallData] = useState<any>();

    /**
     * @prop Property for current temperature.
     */
    const [temperature, setTemperature] = useState<number>();

    /**
     * @prop Label for unit of temperature measure (Ex: C or F).
     */
    const [temperatureUnitsLabel, setTemperatureUnitsLabel] = useState<string>("");

    /**
     * @prop The current time.
     */
    const [time, setTime] = useState<Date>(new Date());

    /**
     * @prop Property for checkbox depending on whether or not it is
     * checked.
     */
    const [toggled, setIsToggled] = useState<boolean>(false);

    /**
     * This function is called when state of units toggle switch is updated.
     */
    const handleToggleChange = (): void => {
        weather.toggleUnits();
        setToggleCheckedState();
    }

    /**
     * Sets state for current city.
     */
    const setCityName = async (): Promise<void> => {
        setCity(await weather.getCityInfo());
    }

    /**
     * Sets state for country for where current city is located.
     */
    const setCountryName = async (): Promise<void> => {
        setCountry(await weather.getCountryName());
    }

    /**
     * Gets date time stamp from one call data and sets date as string using 
     * the format: <day_of_week>, <month> <day_of_month>, <year>.
     */
    const setCurrentDate = (): void => {
        let localDateTime = dateTimeUtility.getDateTime(
            oneCallData?.current.dt, oneCallData?.timezone_offset);
        setDate(dateTimeUtility.getDateInfo(localDateTime));
    }

    /**
     * Sets value for variable "toggled" depending on what units is being used 
     * by the Weather class instance.
     */
    const setToggleCheckedState = (): void => {
        if (weather.getUnits() === "IMPERIAL") setIsToggled(false);
        else if (weather.getUnits() === "METRIC") setIsToggled(true);
    }

    /**
     * Set the value for the units label prop to C or F.
     */
    const updateTemperatureUnitsLabel = (): void => {
        if (weather.getUnits() === "IMPERIAL") setTemperatureUnitsLabel("F");
        else if (weather.getUnits() === "METRIC" ) setTemperatureUnitsLabel("C");
    }

    useEffect(() => {
        setCityName();
        setCountryName();
        setFreeTierData(weather.getJSONFreeTierData());
        setOneCallData(weather.getJSONOneCallWeatherData());
        setToggleCheckedState();
        updateTemperatureUnitsLabel();

        // Set time to be rendered and refresh every second.
        setInterval(() => setTime(new Date()), 1000);
        setCurrentDate();

        // Temperature props.
        setTemperature(weather.calculateTemperature(freeTierData?.main.temp));
        setFeelsLikeTemperature(weather.calculateTemperature(
            freeTierData?.main.feels_like));
        setHighTemperature(weather.calculateTemperature(freeTierData?.main.temp_max));
        setLowTemperature(weather.calculateTemperature(freeTierData?.main.temp_min));
        console.log(city + ", " + country);
        console.log("Free tier data (ctrl+s if no output on page load):");
        console.log(freeTierData);
        console.log("One call data");
        console.log(oneCallData);

        // If something isn't right add prop to dependency array.
    }, [weather, toggled, temperature]);

    
    return (
        <div className='clear-sky content'>
            <div className='forecast'>
                <ForecastHeader>
                    <UnitToggleSwitch weather={weather} 
                        rounded={true} 
                        isToggled={toggled} 
                        handleToggleChange={handleToggleChange}/>
                    <h2 className='page-title'>Current conditions in {typeof city === 'string' ? city : null}</h2>
                </ForecastHeader>
                <div className='current-conditions-container'>
                    <div className='current-conditions-left'>
                        <div className="date-time-container">
                            <div>{date}</div>
                            <div>{time.toLocaleTimeString()}</div>
                        </div>
                        <div className='current-temperature'>{temperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                        <div className='today-high-low-temperature'>Today's High: {highTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                        <div className='today-high-low-temperature'>Today's Low: {lowTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                    </div>
                    <div className='current-conditions-right'>
                        <div className='current-conditions-info'>
                            <img src="./icons/temperature-feels-like.svg"></img>
                            <div className='current-conditions-info-description'>
                                Feels Like
                                <div>{feelsLikeTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                            </div>
                        </div>
                        <div className='current-conditions-info'>
                        <img className="conditions-icon" src="./icons/humidity.png"></img>
                            <div className='current-conditions-info-description'>
                                Humidity
                                <div>{freeTierData && freeTierData.main.humidity}%</div>
                            </div>
                        </div>
                    </div>
                </div>             
            </div>
            <div className='forecast'>
                <h3>Free Tier Data</h3>
                <p>clouds: {freeTierData && freeTierData.clouds.all}</p>
                <p>cod: {freeTierData && freeTierData.cod}</p>
                <br></br>
                <h4>coord:</h4>
                <p>lat:{freeTierData && freeTierData.coord.lat}</p>
                <p>lon:{freeTierData && freeTierData.coord.lon}</p>
                <br></br>
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
                <p>icon:</p>
                {/* freeTierData? to prevent undefined property error */}
                <div><img src={`https://openweathermap.org/img/wn/${freeTierData?.weather[0].icon}@2x.png`}></img></div>
                <p>id: {freeTierData && freeTierData.weather[0].id}</p>
                <p>main: {freeTierData && freeTierData.weather[0].main}</p>
                <br></br>
                <h4>wind:</h4>
                <p>deg: {freeTierData && freeTierData.wind.deg}</p>
                <p>gust: {freeTierData && freeTierData.wind.gust}</p>
                <p>speed: {freeTierData && freeTierData.wind.speed}</p>
                <br></br>
                <hr></hr>
                <h3>One Call Data</h3>
                {/* oneCallData? to prevent undefined property error */}
                <p>{typeof oneCallData && oneCallData?.current.clouds}</p>
            </div>
        </div> 
    )
};

export default Home;