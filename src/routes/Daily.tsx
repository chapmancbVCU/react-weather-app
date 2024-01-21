/**
 * @file Contains functions related to rendering the daily forecast.
 * @author Chad Chapman
 */
import { FC } from 'react';
import { Weather } from "../ts/Weather";


/**
 * @interface HomePageProps The interface that describes props
 * that are shared between components.
 */
interface DailyPageProps {
    weather: Weather;
}


/**
 * Renders the daily forecast component.
 * @returns React.Fragment that contains the daily forecast component.
 */
// @ts-ignore
const Daily : FC<DailyPageProps> = ({ weather }) => {
    return (
        <>
            <h2 className='page-title'>Your 7 Day Forecast</h2>
        </>
    )
};

export default Daily;