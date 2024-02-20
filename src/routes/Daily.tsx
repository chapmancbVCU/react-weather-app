/**
 * @file Contains functions related to rendering the daily forecast.
 * @author Chad Chapman
 */
import '../css/currentConditionsBackground.css';
import DailyForecastCard from '../components/DailyForecastCard.tsx';
import { DailyForecastType } from '../types/DailyForecastType.ts';
import { DateTimeUtility } from '../classes/DateTimeUtility.ts';
import '../css/dailyForecast.css';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import QuickFavorites from '../components/QuickFavorites.tsx';
import SearchBar  from '../components/SearchBar.tsx';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import useDailyForecast from '../hooks/useDailyForecast.ts';
import useForecast from '../hooks/useForecast.ts';
import useSetBackground from '../hooks/useSetBackground.ts';
import useUnitsToggle from '../hooks/useUnitsToggle.ts';
import { Weather } from "../classes/Weather.ts";

/**
 * @interface HomePageProps The interface that describes props
 * that are shared between components.
 */
interface DailyPageProps {
    dateTimeUtility: DateTimeUtility;
    weather: Weather;
}

/**
 * Renders the daily forecast component.
 * @returns JSX.Element that contains the daily forecast component.
 */
// @ts-ignore
const Daily : FC<DailyPageProps> = ({ dateTimeUtility, weather }): JSX.Element => {
        
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

    /** 
     * Hook for dailyForecastType
     */
    const {
        dailyForecast,
        onCardClick,
        selectedCardTemp,
        selectedDate,
        selectedSummary
    } = useDailyForecast(dateTimeUtility, oneCallData, toggled, weather);

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
                    <h2 className='page-title'>Your 7 Day Forecast for {typeof city === 'string' ? city : null}</h2>
                </ForecastHeader>
                <hr className='hr-border'></hr>
                <div className='daily-forecast-container'>{dailyForecast.map((daily: DailyForecastType, index: number) => (
                    <DailyForecastCard key={index}
                    daily={daily}
                    onCardClick={onCardClick}
                    dateTimeUtility={dateTimeUtility}
                    weather={weather} 
                    index={index}>
                    </DailyForecastCard>
                ))}</div>
                <hr className='hr-border'></hr>
                <div className='selected-daily-forecast'>
                    <h4>{selectedDate}</h4>
                    <div className='selected-summary'>{selectedSummary}</div>
                </div>
            </div>
        </div>
    )
};

export default Daily;