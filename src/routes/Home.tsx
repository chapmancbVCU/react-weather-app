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
import { Favorite } from '../classes/Favorite.ts';

/**
 * @interface HomePageProps The interface that describes props that are shared 
 * between components.
 */
interface HomePageProps {
    dateTimeUtility: DateTimeUtility;
    favorites: Favorite[];
    weather: Weather;
}

/**
 * Renders the current conditions forecast component.
 * @returns JSX.Element that contains the current conditions forecast 
 * component.
 */
const Home : FC<HomePageProps> = ({ dateTimeUtility, favorites, weather }): JSX.Element => {
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
    } = useUnitsToggle(weather, favorites, freeTierData);
    
    /**
     * Manages most of daily forecast state data.
     */
    const {
        conditionIcon,
        currentConditions,
        date,
        dayTemperature,
        dayFeelsLikeTemperature,
        eveningTemperature,
        eveningFeelsLikeTemperature,
        dewPoint,
        feelsLikeTemperature,
        forecastTime,
        highTemperature,
        localTime,
        lowTemperature,
        moonRise,
        moonSet,
        morningTemperature,
        morningFeelsLikeTemperature,
        nightTemperature,
        nightFeelsLikeTemperature,
        pop,
        summary,
        sunRise,
        sunSet,
        temperature,
        uvi,
        windGust
    } = useCurrentConditions(dateTimeUtility, freeTierData, oneCallData, weather, toggled);

    /**
     * Used to set background of app based on current conditions based 
     * on free tier data.
     */
    const { conditionsClassName } =  useSetBackground(freeTierData, weather);

    return (
        <div className={conditionsClassName}>
            <QuickFavorites 
                favorites={favorites}
                weather={weather}/>
            <div className='forecast'>
                <ForecastHeader>
                    <SearchBar searchTerm={searchTerm}
                        options={options}
                        onInputChange={onInputChange}
                        onOptionSelect={onOptionSelect}
                        onSubmit={onSubmit}  />
                    <UnitToggleSwitch weather={weather} 
                        favorites={favorites}
                        rounded={true} 
                        isToggled={toggled} 
                        handleToggleChange={handleToggleChange}
                        useUnitsToggle={useUnitsToggle}/>
                    <h2 className='page-title'>Current conditions in {typeof city === 'string' ? city : null}</h2>
                </ForecastHeader>
                <p className='today-description'>{summary}</p>
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
                                src={conditionIcon}>
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
                                <div>{pop}%</div>
                            </div>
                        </div>
                        <div className='current-conditions-info'>
                            <img className="conditions-icon" src="./icons/weather-windy.png"></img>
                            <div className='current-conditions-info-description'>
                                Winds
                                <div>{weather.getWindSpeed(freeTierData?.wind.speed, toggled)}, {weather.getWindDirection(freeTierData?.wind.deg)}</div>
                                Wind Gusts
                                <div>{windGust}</div>
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
                            <div>{uvi} out of 10</div>
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