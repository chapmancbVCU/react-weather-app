/**
 * @file Contains functions related to rendering the hourly forecast.
 * @author Chad Chapman
 */
import '../css/currentConditionsBackground.css';
import { DateTimeUtility } from '../classes/DateTimeUtility.ts';
import { FC, useEffect, useState } from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import HourlyForecastCard from '../components/HourlyForecastCard.tsx';
import { HourlyType } from '../types/HourlyType.ts';
import QuickFavorites from '../components/QuickFavorites.tsx';
import SearchBar  from '../components/SearchBar.tsx';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import useForecast from '../hooks/useForecast.ts';
import useSetBackground from '../hooks/useSetBackground.ts';
import useUnitsToggle from '../hooks/useUnitsToggle.ts';
import { Weather } from "../classes/Weather.ts";
import useHourlyForecast from '../hooks/useHourlyForecast.ts';

/**
 * @interface HourlyPageProps The interface that describes props
 * that are shared between components.
 */
interface HourlyPageProps {
    dateTimeUtility: DateTimeUtility;
    weather: Weather;
}


/**
 * Renders the hourly forecast component.
 * @returns JSX.Element that contains the hourly forecast component.
 */
// @ts-ignore
const Hourly : FC<HourlyPageProps> =({ dateTimeUtility, weather }): JSX.Element => {
    

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

    /**
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);

    const {
        hourlyForecast,
        onCardClick,
        selectedCard,
        selectedCardFeelsLike,
        selectedDescription,
        selectedDewPoint,
        selectedIcon,
        selectedCardTemp,
        selectedDate,
        selectedTime,
        selectedUVI,
        selectedWindGust,
        selectedWindSpeed,
        selectedWindDegrees,
    } = useHourlyForecast(dateTimeUtility,oneCallData, toggled, weather);
    
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
                    <h2 className='page-title'>Hourly Forecast for {typeof city === 'string' ? city : null}</h2>
                </ForecastHeader>
                <hr className='hr-border'></hr>
                <div className='hourly-forecast-container'>{hourlyForecast.map((hourly: HourlyType, index: number) => (
                    <HourlyForecastCard key={index}
                        hourly={hourly}
                        dateTimeUtility={dateTimeUtility}
                        onCardClick={onCardClick}
                        weather={weather}
                        index={index}>
                    </HourlyForecastCard>
                ))}</div>
                <hr className='hr-border'></hr>
                <div className='selected-daily-forecast'>
                    <h3>{selectedDate}, {selectedTime}</h3>
                </div>
                <div className='selected-card-content'>
                    <div className='hourly-conditions'>
                        <h4>{selectedCardTemp}  {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</h4>
                        <h4>Temperature</h4>
                    </div>
                    <div className='hourly-conditions'>
                        <h4>{selectedCardFeelsLike}  {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</h4>
                        <h4>Feels Like</h4>
                    </div>
                    <div className='hourly-conditions'>
                        <img src={`https://openweathermap.org/img/wn/${selectedIcon}@2x.png`}></img>
                    </div>
                    <div className='hourly-conditions'>
                        <h4>{selectedDescription}</h4>
                    </div>
                </div>
                <hr className='hr-border'></hr>
                <div className='selected-card-content'>
                    <div className='hourly-conditions hourly-conditions-info'>
                        <img className="hourly-conditions-icon" src="./icons/weather-windy.png"></img>
                        <div className='hourly-conditions-info-description'>
                            Winds
                            <div>{selectedWindSpeed}, {selectedWindDegrees}</div>
                            Wind Gusts
                            <div>{selectedWindGust}</div>
                        </div>
                    </div>
                    <div className='hourly-conditions-info'>
                        <img className='hourly-conditions-icon' src='./icons/weather-pouring.png'></img>
                        <div className='hourly-conditions-info-description'>
                            Chance of PPT
                            <div>{(selectedCard?.pop! * 100).toFixed(0)} %</div>
                        </div>
                    </div>
                    <div className='hourly-conditions-info'>
                        <img className='hourly-conditions-icon' src='./icons/visibility.png'></img>
                        <div className='hourly-conditions-info-description'>
                            Visibility
                            <div>{weather.getVisibility(selectedCard?.visibility!)}</div>
                        </div>
                    </div>
                    <div className='hourly-conditions-info'>
                        <img className='hourly-conditions-icon' src='./icons/visibility.png'></img>
                        <div className='hourly-conditions-info-description'>
                            Humidity
                            <div>{selectedCard?.humidity}%</div>
                        </div>
                    </div>
                </div>
                <hr className='hr-border'></hr>
                <div className='current-conditions-container today-conditions'>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/dew-point.png'></img>
                        <div className='current-conditions-info-description'>
                            Dew Point
                            <div>{selectedDewPoint} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/UVI.png'></img>
                        <div className='current-conditions-info-description'>
                            UV Index
                            <div>{selectedUVI} out of 10</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/air-pressure.png'></img>
                        <div className='current-conditions-info-description'>
                            Pressure
                            <div>{weather.getPressure(selectedCard?.pressure!)}</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/clouds.png'></img>
                        <div className='current-conditions-info-description'>
                            Cloudiness
                            <div>{selectedCard?.clouds!} %</div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
};

export default Hourly;