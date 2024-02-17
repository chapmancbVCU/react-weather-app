/**
 * @file Contains functions related to rendering the daily forecast.
 * @author Chad Chapman
 */
import '../css/currentConditionsBackground.css';
import DailyForecastCard from '../components/DailyForecastCard.tsx';
import DetailedDailyForecast from '../components/DetailedDailyForecast.tsx';
import { DateTimeUtility } from '../classes/DateTimeUtility.ts';
import { FC, useEffect, useState } from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import QuickFavorites from '../components/QuickFavorites.tsx';
import SearchBar  from '../components/SearchBar.tsx';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import useForecast from '../hooks/useForecast.ts';
import useSetBackground from '../hooks/useSetBackground.ts';
import useUnitsToggle from '../hooks/useUnitsToggle.ts';
import { Weather } from "../classes/Weather.ts";
import { DailyForecastCardType } from '../types/DailyForecastCardType.ts';

/**
 * @interface HomePageProps The interface that describes props
 * that are shared between components.
 */
interface DailyPageProps {
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
     * @prop Describes array for DailyForecastCardType.
     */
    const [dailyForecastCard, setDailyForecastCard] = useState<DailyForecastCardType[]>([]);

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
     * Setup DailyForecastCard array for handling data for daily forecast 
     * cards.
     */
    const setDailyForecastCardType = () => {
        console.log("forecast card type");
        let typeArray: DailyForecastCardType[] = []; 
        for (let i: number = 0; i < 8; i++) {
            let temp: DailyForecastCardType = {
                description: oneCallData?.daily[i].weather[0].description,
                dt: oneCallData?.daily[i].dt,
                icon: oneCallData?.daily[i].weather[0].icon,
                min: oneCallData?.daily[i].temp.min,
                max: oneCallData?.daily[i].temp.max
            }
            typeArray.push(temp);
        }
        setDailyForecastCard(typeArray);
    }

    useEffect(() => {
        setDailyForecastCardType();
        for(let i: number = 0; i < dailyForecastCard.length; i++) {
            console.log(`Description: ${dailyForecastCard[i].description}`);
            console.log(`DT: ${dailyForecastCard[i].dt}`);
            console.log(`Icon: ${dailyForecastCard[i].icon}`);
            console.log(`Min: ${dailyForecastCard[i].min}`);
            console.log(`Max: ${dailyForecastCard[i].max}`);
            console.log("-------------------");
        }
    }, [oneCallData]);

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
                    <h3>Free Tier Data</h3>
                    <p>clouds: {freeTierData && freeTierData.clouds.all}</p>
                    <p>{typeof oneCallData && oneCallData?.current.clouds}</p>
                </ForecastHeader>
            </div>
        </div>
    )
};

export default Daily;