/**
 * @file Contains functions related to rendering the hourly forecast.
 * @author Chad Chapman
 */
import { DateTimeUtility } from '../ts/DateTimeUtility';
import { FC, useEffect, useState } from 'react';
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
        <>
            <h2 className='page-title'>Hourly Forecast</h2>
            <p>{typeof oneCallData && oneCallData?.current.clouds}</p>
        </>
    )
};

export default Hourly;