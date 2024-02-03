/**
 * @file Contains functions related to rendering the hourly forecast.
 * @author Chad Chapman
 */
import { DateTimeUtility } from '../ts/DateTimeUtility';
import { FC, useEffect, useState } from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import { Weather } from "../ts/Weather";


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
    /**
     * @prop One call tier data for displaying hourly and daily forecast.
     */
    const [oneCallData, setOneCallData] = useState<any>();

    /**
     * Sets state for one call tier data.
     */
    const setOneCallWeatherData = async () => {
        const data = await weather.getJSONDescriptiveWeatherData();
        setOneCallData(data);
    }

    useEffect(() => {
        setOneCallWeatherData()
    }, []);


    return (
        <div className='clear-sky content'>
            <div className='forecast'>
                <ForecastHeader>
                    <UnitToggleSwitch weather={weather} rounded={true}/>
                    <h2 className='page-title'>Hourly Forecast</h2>
                </ForecastHeader>
            </div>
            
            <p>{typeof oneCallData && oneCallData?.current.clouds}</p>
        </div>
    )
};

export default Hourly;