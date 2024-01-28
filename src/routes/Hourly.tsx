/**
 * @file Contains functions related to rendering the hourly forecast.
 * @author Chad Chapman
 */
import { FC } from 'react';
import { Weather } from "../ts/Weather";
import { DateTimeUtility } from '../ts/DateTimeUtility';


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
 * @returns React.Fragment that contains the hourly forecast component.
 */
// @ts-ignore
const Hourly : FC<HourlyPageProps> =({ dateTimeUtility, weather }) => {
    return (
        <>
            <h2 className='page-title'>Hourly Forecast</h2>
        </>
    )
};

export default Hourly;