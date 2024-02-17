/**
 * @file Contains functions related to rendering the current conditions.
 * @author Chad Chapman
 */
import '../css/currentConditions.css';
import '../css/currentConditionsBackground.css';
import { DateTimeUtility } from '../classes/DateTimeUtility.ts';
import { FC, useState, useEffect } from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import QuickFavorites from '../components/QuickFavorites.tsx';
import SearchBar  from '../components/SearchBar.tsx';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import useCurrentConditions from '../hooks/useCurrentConditions.ts';
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
     * @prop for date in the following format: 
     * <day_of_week>, <month> <day_of_month>, <year>.
     */
    const [date, setDate] = useState<string>("");

    /**
     * @prop Date time string derived from Unix time.
     */
    const [dateTimeStamp, setDateTimeStamp] = useState<string>("");

    /**
     * @prop Represents time forecast data was fetched for a particular location.
     */
    const [forecastTime, setForecastTime] = useState<string>("");

    /**
     * @prop The current time.
     */
    const [localTime, setLocalTime] = useState<Date>(new Date());
 
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
    
    /**
     * Manages setup of weather data during initial startup and after a user 
     * performs a search.
     */
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
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);
    
    /**
     * Manages most of daily forecast state data.
     */
    const { 
        currentConditions,
        dayTemperature,
        dayFeelsLikeTemperature,
        eveningTemperature,
        eveningFeelsLikeTemperature,
        dewPoint,
        feelsLikeTemperature,
        highTemperature,
        lowTemperature,
        moonRise,
        moonSet,
        morningTemperature,
        morningFeelsLikeTemperature,
        nightTemperature,
        nightFeelsLikeTemperature,
        sunRise,
        sunSet,
        temperature,
    } = useCurrentConditions(dateTimeUtility, freeTierData, oneCallData, weather, toggled);

    /**
     * Used to set background of app based on current conditions based 
     * on free tier data.
     */
    const { conditionsClassName } =  useSetBackground(freeTierData, weather);

    useEffect(() => {
        // Set time to be rendered and refresh every second.
        setInterval(() => setLocalTime(new Date()), 1000);
        setDateTime();
        setForecastTimeInformation();
        setCurrentDate();

        // If something isn't right add prop to dependency array.
    }, [weather, freeTierData, oneCallData, toggled, city, temperature]);

    return (
        <div className={conditionsClassName}>
            <QuickFavorites />
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
                <p className='today-description'>{oneCallData?.daily[0]?.summary}</p>
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
                <div className='current-conditions-container today-conditions'>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/dew-point.png'></img>
                        <div className='current-conditions-info-description'>
                            Dew Point
                            <div>{dewPoint} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/UVI.png'></img>
                        <div className='current-conditions-info-description'>
                            UV Index
                            <div>{(oneCallData?.daily[0].uvi.toFixed(0))} out of 10</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/air-pressure.png'></img>
                        <div className='current-conditions-info-description'>
                            Pressure
                            <div>{weather.getPressure(freeTierData?.main.pressure)}</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/visibility.png'></img>
                        <div className='current-conditions-info-description'>
                            Visibility
                            <div>{weather.getVisibility(freeTierData?.visibility)}</div>
                        </div>
                    </div>
                </div>
                <hr className='hr-border'></hr>
                <div className='current-conditions-container today-conditions'>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/sun-rise.png'></img>
                        <div className='current-conditions-info-description'>
                            Sun Rise
                            <div>{sunRise}</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/sun-set.png'></img>
                        <div className='current-conditions-info-description'>
                            Sun Set
                            <div>{sunSet}</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/moon-rise.png'></img>
                        <div className='current-conditions-info-description'>
                            Moon Rise
                            <div>{moonRise}</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/moon-set.png'></img>
                        <div className='current-conditions-info-description'>
                            Moon Set
                            <div>{moonSet}</div>
                        </div>
                    </div>
                </div>
                <hr className='hr-border'></hr>
                <h3>Temperature Range</h3>
                <div className='current-conditions-container today-conditions'>
                    <div className='additional-information-item'>
                        <h4>Morning</h4>
                        <div className='additional-information-data'>
                            {morningTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                    <div className='additional-information-item'>
                        <h4>Day</h4>
                        <div className='additional-information-data'>
                            {dayTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                    <div className='additional-information-item'>
                        <h4>Evening</h4>
                        <div className='additional-information-data'>
                            {eveningTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                    <div className='additional-information-item'>
                        <h4>Night</h4>
                        <div className='additional-information-data'>
                            {nightTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                </div>
                <hr className='hr-border'></hr>
                <h3>Feels Like Temperature Range</h3>
                <div className='current-conditions-container today-conditions'>
                    <div className='additional-information-item'>
                        <h4>Morning</h4>
                        <div className='additional-information-data'>
                            {morningFeelsLikeTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                    <div className='additional-information-item'>
                        <h4>Day</h4>
                        <div className='additional-information-data'>
                            {dayFeelsLikeTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                    <div className='additional-information-item'>
                        <h4>Evening</h4>
                        <div className='additional-information-data'>
                            {eveningFeelsLikeTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                    <div className='additional-information-item'>
                        <h4>Night</h4>
                        <div className='additional-information-data'>
                            {nightFeelsLikeTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                </div>      
            </div>
        </div> 
    );
};

export default Home;