/**
 * @file Contains functions related to rendering the current conditions.
 * @author Chad Chapman
 */
import '../css/currentConditions.css';
import '../css/currentConditionsBackground.css';
import { DateTimeUtility } from '../classes/DateTimeUtility.ts';
import { FC, useState, useEffect } from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import SearchBar  from '../components/SearchBar.tsx';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import useForecast from '../hooks/useForecast.ts';
import useSetBackground from '../hooks/useSetBackground.ts';
import useUnitsToggle from '../hooks/useUnitsToggle.ts';
import { Weather } from "../classes/Weather.ts";

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
     * @prop Description of current conditions outside.
     */
    const [currentConditions, setCurrentConditions] = useState<string>();

    /**
     * @prop for date in the following format: 
     * <day_of_week>, <month> <day_of_month>, <year>.
     */
    const [date, setDate] = useState<string>("");

    /**
     * @prop Date time string derived from Unix time.
     */
    const [dateTimeStamp, setDateTimeStamp] = useState<string>("");

    /**
     * @prop Temperature for dew point.
     */
    const [dewPoint, setDewPoint] = useState<number>();

    /**
     * @prop Property for feels like temperature.
     */
    const [feelsLikeTemperature, setFeelsLikeTemperature] = useState<string>("")

    /**
     * @prop Represents time forecast data was fetched for a particular location.
     */
    const [forecastTime, setForecastTime] = useState<string>("");

    /**
     * @prop Current day high temperature.
     */
    const [highTemperature, setHighTemperature] = useState<number>();

    /**
     * @prop The current time.
     */
    const [localTime, setLocalTime] = useState<Date>(new Date());

    /**
     * @prop Current day low temperature.
     */
    const [lowTemperature, setLowTemperature] = useState<number>();

    const [moonRise, setMoonRise] = useState<string>("");
    const [moonSet, setMoonSet] = useState<string>("");
    const [sunRise, setSunRise] = useState<string>("");

    const [sunSet, setSunSet] = useState<string>("");

    /**
     * @prop Property for current temperature.
     */
    const [temperature, setTemperature] = useState<number>();

    /**
     * Capitalize first letter of each word of current conditions description.
     */
    const setCurrentConditionsProps = async (): Promise<void> => {
        const currentConditions: string = await freeTierData?.weather[0].description;
        console.log("current conditions:");
        console.log(currentConditions);
        const wordsArray: string[] = currentConditions.split(" ");
        for(let i: number = 0; i < wordsArray.length; i++) {
            wordsArray[i] = wordsArray[i][0].toUpperCase() + wordsArray[i].substring(1);
        }

        setCurrentConditions(wordsArray.join(" "));
    }
 
    /**
     * Gets date time stamp from one call data and sets date as string using 
     * the format: <day_of_week>, <month> <day_of_month>, <year>.
     */
    const setCurrentDate = (): void => {
        setDate(dateTimeUtility.getDateInfo(dateTimeStamp));
    }

    /**
     * Sets date-time stamp for GMT.
     */
    const setDateTime = (): void => {
        setDateTimeStamp(dateTimeUtility.getDateTime(
            oneCallData?.current.dt, oneCallData?.timezone_offset));
    }

    /**
     * Sets the time for location we are fetching data.
     */
    const setForecastTimeInformation = (): void => {
        setForecastTime(dateTimeUtility.getTimeInfo(dateTimeStamp));
    }
    
    const {
        freeTierData,
        oneCallData,
        searchTerm,
        options,
        city,
        country,
        onInputChange,
        onOptionSelect,
        onSubmit
    } = useForecast(weather);

    /**
     * Used to set background of app based on current conditions based 
     * on free tier data.
     */
    const { conditionsClassName } =  useSetBackground(freeTierData, weather);

    const setMoonRiseTime = (): void => {
        const time = dateTimeUtility.getDateTime(
            oneCallData?.daily[0].moonrise, oneCallData?.timezone_offset);
        setMoonRise(dateTimeUtility.getTimeInfo(time));
    }

    const setMoonSetTime = (): void => {
        const time = dateTimeUtility.getDateTime(
            oneCallData?.daily[0].moonset, oneCallData?.timezone_offset);
        setMoonSet(dateTimeUtility.getTimeInfo(time));
    }

    const setSunRiseTime = (): void => {
        const time = dateTimeUtility.getDateTime(
            oneCallData?.daily[0].sunrise, oneCallData?.timezone_offset);
        setSunRise(dateTimeUtility.getTimeInfo(time));
    }

    const setSunSetTime = (): void => {
        const time = dateTimeUtility.getDateTime(
            oneCallData?.daily[0].sunset, oneCallData?.timezone_offset);
        setSunSet(dateTimeUtility.getTimeInfo(time));
    }

    /**
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);

    useEffect(() => {
        // Set time to be rendered and refresh every second.
        setInterval(() => setLocalTime(new Date()), 1000);
        setDateTime();
        setForecastTimeInformation();
        setCurrentDate();

        // Temperature props.
        setTemperature(weather.calculateTemperature(freeTierData?.main.temp));
        setFeelsLikeTemperature(weather.calculateTemperature(
            freeTierData?.main.feels_like));
        setHighTemperature(weather.calculateTemperature(freeTierData?.main.temp_max));
        setLowTemperature(weather.calculateTemperature(freeTierData?.main.temp_min));
        setDewPoint(weather.calculateTemperature(oneCallData?.current.dew_point));

        setCurrentConditionsProps();

        setSunRiseTime();
        setSunSetTime();
        setMoonRiseTime();
        setMoonSetTime();
        // If something isn't right add prop to dependency array.
    }, [weather, temperature, freeTierData, toggled, city]);

    return (
        <div className={conditionsClassName}>
            <div className='forecast'>
                <ForecastHeader>
                    <SearchBar searchTerm={searchTerm}
                        options={options}
                        onInputChange={onInputChange}
                        onOptionSelect={onOptionSelect}
                        onSubmit={onSubmit}  />
                    <UnitToggleSwitch weather={weather} 
                        rounded={true} 
                        isToggled={toggled} 
                        handleToggleChange={handleToggleChange}
                        useUnitsToggle={useUnitsToggle}/>
                    <h2 className='page-title'>Current conditions in {typeof city === 'string' ? city : null}</h2>
                </ForecastHeader>
                <p className='daily-description'>{oneCallData?.daily[0].summary}</p>
                <div className='current-conditions-container'>
                    <div className='current-conditions-left'>
                        <div className="date-time-container">
                            <div>{date}</div>
                            <div>Local Time: {localTime.toLocaleTimeString()}</div>
                            <div>Forecast Location Time: {typeof forecastTime === 'string' ? forecastTime : null}</div>
                        </div>
                        <div className='current-temperature'>{temperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                        <div className='today-high-low-temperature'>Today's High: {highTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                        <div className='today-high-low-temperature'>Today's Low: {lowTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                        <div className='description-container'>
                            <div className='current-conditions-description'>
                                {typeof currentConditions === 'string' ? currentConditions : null}
                            </div>
                            <img className='description-icon' 
                                src={`https://openweathermap.org/img/wn/${freeTierData?.weather[0].icon}@2x.png`}>
                            </img>
                        </div>
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
                        <div className='current-conditions-info'>
                            <img className="conditions-icon" src="./icons/weather-pouring.png"></img>
                            <div className='current-conditions-info-description'>
                                Chance of PPT
                                <div>{oneCallData && (oneCallData.daily[0].pop * 100).toFixed(0)}%</div>
                            </div>
                        </div>
                        <div className='current-conditions-info'>
                            <img className="conditions-icon" src="./icons/weather-windy.png"></img>
                            <div className='current-conditions-info-description'>
                                Winds
                                <div>{weather.getWindSpeed(freeTierData?.wind.speed)}, {weather.getWindDirection(freeTierData?.wind.deg)}</div>
                                Wind Gusts
                                <div>{weather.getWindSpeed(oneCallData?.daily[0].wind_gust)}</div>
                            </div>
                        </div>
                    </div>
                </div>  
                <hr className='hr-border'></hr>
                <div className='current-conditions-container daily-conditions'>
                    <div className='daily-conditions-info'>
                        <img className='conditions-icon' src='./icons/dew-point.png'></img>
                        <div className='current-conditions-info-description'>
                            Dew Point
                            <div>{dewPoint} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                        </div>
                    </div>
                    <div className='daily-conditions-info'>
                        <img className='conditions-icon' src='./icons/UVI.png'></img>
                        <div className='current-conditions-info-description'>
                            UV Index
                            <div>{(oneCallData?.daily[0].uvi.toFixed(0))} out of 10</div>
                        </div>
                    </div>
                    <div className='daily-conditions-info'>
                        <img className='conditions-icon' src='./icons/air-pressure.png'></img>
                        <div className='current-conditions-info-description'>
                            Pressure
                            <div>{weather.getPressure(freeTierData?.main.pressure)}</div>
                        </div>
                    </div>
                    <div className='daily-conditions-info'>
                        <img className='conditions-icon' src='./icons/visibility.png'></img>
                        <div className='current-conditions-info-description'>
                            Visibility
                            <div>{weather.getVisibility(freeTierData?.visibility)}</div>
                        </div>
                    </div>
                </div>
                <hr className='hr-border'></hr>
                <div className='current-conditions-container daily-conditions'>
                    <div className='daily-conditions-info'>
                        <img className='conditions-icon' src='./icons/sun-rise.png'></img>
                        <div className='current-conditions-info-description'>
                            Sun Rise
                            <div>{sunRise}</div>
                        </div>
                    </div>
                    <div className='daily-conditions-info'>
                        <img className='conditions-icon' src='./icons/sun-set.png'></img>
                        <div className='current-conditions-info-description'>
                            Sun Set
                            <div>{sunSet}</div>
                        </div>
                    </div>
                    <div className='daily-conditions-info'>
                        <img className='conditions-icon' src='./icons/moon-rise.png'></img>
                        <div className='current-conditions-info-description'>
                            Moon Rise
                            <div>{moonRise}</div>
                        </div>
                    </div>
                    <div className='daily-conditions-info'>
                        <img className='conditions-icon' src='./icons/moon-set.png'></img>
                        <div className='current-conditions-info-description'>
                            Moon Set
                            <div>{moonSet}</div>
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
                <p>{JSON.stringify(oneCallData)}</p>
            </div>
        </div> 
    )
};

export default Home;