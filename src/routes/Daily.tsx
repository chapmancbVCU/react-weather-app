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
import { DailyForecastType } from '../types/DailyForecastCardType.ts';

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
    const [dailyForecast, setDailyForecast] = useState<DailyForecastType[]>([]);

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
    const setDailyForecastData = () => {
        console.log("forecast card type");
        let typeArray: DailyForecastType[] = []; 
        for (let i: number = 0; i < 8; i++) {
            let setData: DailyForecastType = {
                clouds: oneCallData?.daily[i].clouds,
                description: oneCallData?.daily[i].weather[0].description,
                dew_point: oneCallData?.daily[i].dew_point,
                dt: oneCallData?.daily[i].dt,
                feels_like: {
                    day: oneCallData?.daily[i].feels_like.day,
                    eve: oneCallData?.daily[i].feels_like.eve,
                    morn: oneCallData?.daily[i].feels_like.morn,
                    night: oneCallData?.daily[i].feels_like.night,
                },
                humidity: oneCallData?.daily[i].humidity,
                icon: oneCallData?.daily[i].weather[0].icon,
                moon_phase: oneCallData?.daily[i].moon_phase,
                moonrise: oneCallData?.daily[i].moonrise,
                moonset: oneCallData?.daily[i].moonset,
                pop: oneCallData?.daily[i].pop,
                pressure: oneCallData?.daily[i].pressure,
                rain: oneCallData?.daily[i].rain,
                summary: oneCallData?.daily[i].summary,
                sunrise: oneCallData?.daily[i].sunrise,
                sunset: oneCallData?.daily[i].sunset,
                temp: {
                    day: oneCallData?.daily[i].temp.day,
                    eve: oneCallData?.daily[i].temp.eve,
                    max: oneCallData?.daily[i].temp.max,
                    min: oneCallData?.daily[i].temp.min,
                    morn: oneCallData?.daily[i].temp.morn,
                    night: oneCallData?.daily[i].temp.night
                },
                uvi: oneCallData?.daily[i].number,
                weather: {
                    description: oneCallData?.daily[i].weather.description,
                    icon: oneCallData?.daily[i].weather.string,
                },
                winds: {
                    deg: oneCallData?.daily[i].winds.deg,
                    gust: oneCallData?.daily[i].winds.gust,
                    speed: oneCallData?.daily[i].winds.gust,
                }
            }
            typeArray.push(setData);
        }
        setDailyForecast(typeArray);
    }

    useEffect(() => {
        setDailyForecastData();
        for(let i: number = 0; i < dailyForecast.length; i++) {
            console.log(`Description: ${dailyForecast[i].description}`);
            console.log(`DT: ${dailyForecast[i].dt}`);
            console.log(`Icon: ${dailyForecast[i].icon}`);
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