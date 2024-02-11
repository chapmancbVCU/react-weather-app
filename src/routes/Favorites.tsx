/**
 * @file Contains functions related to rendering the hourly forecast.
 * @author Chad Chapman
 */
import '../css/currentConditionsBackground.css';
import { DateTimeUtility } from '../classes/DateTimeUtility';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import { optionType } from '../types/Option';
import SearchBar from '../components/SearchBar';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import useForecast from '../hooks/useForecast.ts';
import useSetBackground from '../hooks/useSetBackground.ts';
import useUnitsToggle from '../hooks/useUnitsToggle.ts';
import { Weather } from "../classes/Weather";

/**
 * @interface HourlyPageProps The interface that describes props
 * that are shared between components.
 */
interface HourlyPageProps {
    weather: Weather;
}

/**
 * Renders the hourly forecast component.
 * @returns JSX.Element that contains the hourly forecast component.
 */
// @ts-ignore
const Favorites : FC<HourlyPageProps> =({ weather }): JSX.Element => {
      
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
     * @prop Used to set background of app based on current conditions based 
     * on free tier data.
     */
    const { conditionsClassName } =  useSetBackground(freeTierData, weather);

    // /**
    //  * Sets state for current city.
    //  */
    // const setCityName = async (): Promise<void> => {
    //     setCity(await weather.getCityInfo());
    // }

    /**
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);

    // useEffect(() => {
    //     if(selectedCity) {
    //         setSearchTerm(selectedCity.name);
    //         setCity(`${selectedCity.name},${selectedCity.state}`);
    //         setOptions([]);
    //     } else {
    //         setCityName();
    //     }

    //     setFreeTierData(weather.getJSONFreeTierData());
    //     setOneCallData(weather.getJSONOneCallWeatherData());
    //     console.log("Free tier data (ctrl+s if no output on page load):");
    //     console.log(freeTierData);
    //     console.log("One call data");
    //     console.log(oneCallData);
    // }, [weather, toggled, freeTierData, city]);

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
                    <h2 className='page-title'>Favorite Locations</h2>
                    <h3>Free Tier Data</h3>
                    <p>clouds: {freeTierData && freeTierData.clouds.all}</p>
                    <p>{typeof oneCallData && oneCallData?.current.clouds}</p>
                </ForecastHeader>
            </div>
        </div>
    )
};

export default Favorites;