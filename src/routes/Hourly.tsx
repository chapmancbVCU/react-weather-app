/**
 * @file Contains functions related to rendering the hourly forecast.
 * @author Chad Chapman
 */
import '../css/currentConditionsBackground.css';
import { DateTimeUtility } from '../classes/DateTimeUtility.ts';
import { FC, useEffect, useState } from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import { HourlyType } from '../types/HourlyType.ts';
import QuickFavorites from '../components/QuickFavorites.tsx';
import SearchBar  from '../components/SearchBar.tsx';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import useForecast from '../hooks/useForecast.ts';
import useSetBackground from '../hooks/useSetBackground.ts';
import useUnitsToggle from '../hooks/useUnitsToggle.ts';
import { Weather } from "../classes/Weather.ts";

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
const Hourly : FC<HourlyPageProps> =({ weather }): JSX.Element => {
    const [hourlyForecast, setHourlyForecast] = useState<HourlyType[]>([]);

    /**
     * Setup HourlyForecast array for handling data for hourly forecast 
     * cards.
     */
    const setHourlyForecastData = () => {
        console.log("hourly card type");
        const typeArray: HourlyType[] = []; 
        for (let i: number = 0; i < 48; i++) {
            const setData: HourlyType = {
                clouds: oneCallData?.hourly[i]?.clouds,
                dew_point: oneCallData?.hourly[i]?.dew_point,
                dt: oneCallData?.hourly[i]?.dt,
                feels_like: oneCallData?.hourly[i]?.feels_like,
                humidity: oneCallData?.hourly[i]?.humidity,
                pop: oneCallData?.hourly[i]?.pop,
                pressure: oneCallData?.hourly[i]?.pressure,
                temp: oneCallData?.hourly[i]?.temp,
                uvi: oneCallData?.hourly[i]?.uvi,
                visibility: oneCallData?.hourly[i]?.visibility,
                weather: {
                    description: oneCallData?.hourly[i].weather[0].description,
                    icon: oneCallData?.hourly[i].weather[0].icon
                },
                wind_deg: oneCallData?.hourly[i]?.wind_deg,
                wind_gust: oneCallData?.hourly[i]?.wind_gust,
                wind_speed: oneCallData?.hourly[i]?.wind_speed
            }
            typeArray.push(setData);
        }
        setHourlyForecast(typeArray);
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

    /**
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);

    useEffect(() => {
        setHourlyForecastData();
    }, [oneCallData]);

    useEffect(() => {
        for(let i: number = 0; i < 1; i++) {
            console.log("clouds: " + hourlyForecast[i]?.clouds);
            console.log("Dew Point: " + hourlyForecast[i]?.dew_point);
            console.log(`DT: ${hourlyForecast[i]?.dt}`);
            console.log("Feels Like: " + hourlyForecast[i]?.feels_like);
            console.log("Humidity: " + hourlyForecast[i]?.humidity);
            console.log("POP: " + hourlyForecast[i]?.pop);
            console.log("Pressure: " + hourlyForecast[i]?.pressure);
            console.log("Temp: " + hourlyForecast[i]?.temp);
            console.log("UVI: " + hourlyForecast[i]?.uvi);
            console.log("Visibility: " + hourlyForecast[i]?.visibility);
            console.log(`Description: ${hourlyForecast[i]?.weather.description}`);
            console.log(`Icon: ${hourlyForecast[i]?.weather.icon}`);
            console.log("Wind Deg: " + hourlyForecast[i]?.wind_deg);
            console.log("Wind Gust: " + hourlyForecast[i]?.wind_gust);
            console.log("Wind Speed: " + hourlyForecast[i]?.wind_speed);
            console.log("-------------------");
        };
    }, [hourlyForecast]);
    
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
                    <h3>Free Tier Data</h3>
                    <p>clouds: {freeTierData && freeTierData.clouds.all}</p>
                    <p>{typeof oneCallData && oneCallData?.current.clouds}</p>
                </ForecastHeader>
                {/* <div>{hourlyForecast.map((hourly: HourlyType, index: number) => (
                    <p>{hourly.clouds}</p>
                ))}</div> */}
            </div>
        </div>
    )
};

export default Hourly;