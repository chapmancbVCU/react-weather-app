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
        selectedDate,
        selectedTime
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
                    <h3>{selectedDate}</h3>
                    <h3>{selectedTime}</h3>
                    {/* <div className='selected-summary'>{selectedSummary}</div>
                    <div className='selected-card-content'>
                        <img src={`https://openweathermap.org/img/wn/${selectedIcon}@2x.png`}></img>
                        <h4>{selectedCardTemp} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</h4>
                    </div>
                    <div className='selected-card-content'>
                        <div className='daily-conditions'>
                            <h4>{selectedLowTemp} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</h4>
                            <h4>Low</h4>
                        </div>
                        <div className='daily-conditions'>
                            <h4>{selectedHighTemp} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</h4>
                            <h4>High</h4>
                        </div>
                        <div className='daily-conditions daily-conditions-info'>
                            <img className="daily-conditions-icon" src="./icons/weather-windy.png"></img>
                            <div className='daily-conditions-info-description'>
                                Winds
                                <div>{selectedWindSpeed}, {selectedWindDegrees}</div>
                                Wind Gusts
                                <div>{selectedWindGust}</div>
                            </div>
                        </div> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
};

export default Hourly;