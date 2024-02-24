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
        selectedCard,
        selectedCardTemp,
        selectedDate,
        selectedDewPoint,
        selectedFLDayTemp,
        selectedFLEveTemp,
        selectedFLMornTemp,
        selectedFLNightTemp,
        selectedEveTemp,
        selectedHighTemp,
        selectedMoonRise,
        selectedMoonSet,
        selectedMornTemp,
        selectedNightTemp,
        selectedIcon,
        selectedLowTemp,
        selectedRain,
        selectedSummary,
        selectedSunRise,
        selectedSunSet,
        selectedUVI,
        selectedWindGust,
        selectedWindSpeed,
        selectedWindDegrees,
    } = useDailyForecast(dateTimeUtility, oneCallData, toggled, weather);

    return (
        <div className={conditionsClassName}>
            <QuickFavorites weather={weather}/>
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
                    <h3>{selectedDate}</h3>
                    <div className='selected-summary'>{selectedSummary}</div>
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
                        </div>
                    </div>
                </div>
                <hr className='hr-border'></hr>
                <h3>Temperature Ranges</h3>
                <div className='current-conditions-container today-conditions'>
                    <div className='additional-information-item'>
                        <h4>Morning</h4>
                        <div className='additional-information-data'>
                            {selectedMornTemp} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                    <div className='additional-information-item'>
                        <h4>Day</h4>
                        <div className='additional-information-data'>
                            {selectedCardTemp} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                    <div className='additional-information-item'>
                        <h4>Evening</h4>
                        <div className='additional-information-data'>
                            {selectedEveTemp} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                    <div className='additional-information-item'>
                        <h4>Night</h4>
                        <div className='additional-information-data'>
                            {selectedNightTemp} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                </div>
                <hr className='hr-border'></hr>
                <h3>Feels Like Temperature Ranges</h3>
                <div className='current-conditions-container today-conditions'>
                    <div className='additional-information-item'>
                        <h4>Morning</h4>
                        <div className='additional-information-data'>
                            {selectedFLMornTemp} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                    <div className='additional-information-item'>
                        <h4>Day</h4>
                        <div className='additional-information-data'>
                            {selectedFLDayTemp} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                    <div className='additional-information-item'>
                        <h4>Evening</h4>
                        <div className='additional-information-data'>
                            {selectedFLEveTemp} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
                        </div>
                    </div>
                    <div className='additional-information-item'>
                        <h4>Night</h4>
                        <div className='additional-information-data'>
                            {selectedFLNightTemp} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
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
                <hr className='hr-border'></hr>
                <div className='current-conditions-container today-conditions'>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/humidity.png'></img>
                        <div className='current-conditions-info-description'>
                            Humidity
                            <div>{selectedCard?.humidity} %</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/weather-pouring.png'></img>
                        <div className='current-conditions-info-description'>
                            Rain
                            <div>{selectedRain} mm</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/weather-pouring.png'></img>
                        <div className='current-conditions-info-description'>
                            Chance of PPT
                            <div>{(selectedCard?.pop! * 100).toFixed(0)} %</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/moon-rise.png'></img>
                        <div className='current-conditions-info-description'>
                            Moon Phase
                            <div>{selectedCard?.moon_phase!}</div>
                        </div>
                    </div>
                </div>  
                <hr className='hr-border'></hr>
                <div className='current-conditions-container today-conditions'>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/sun-rise.png'></img>
                        <div className='current-conditions-info-description'>
                            Sun Rise
                            <div>{selectedSunRise}</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/sun-set.png'></img>
                        <div className='current-conditions-info-description'>
                            Sun Set
                            <div>{selectedSunSet}</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/moon-rise.png'></img>
                        <div className='current-conditions-info-description'>
                            Moon Rise
                            <div>{selectedMoonRise}</div>
                        </div>
                    </div>
                    <div className='today-conditions-info'>
                        <img className='conditions-icon' src='./icons/moon-set.png'></img>
                        <div className='current-conditions-info-description'>
                            Moon Set
                            <div>{selectedMoonSet}</div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
};

export default Daily;