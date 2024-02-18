/**
 * @file Contains functions related to rendering detailed hourly forecast.
 * @author Chad Chapman
 */

import { FC } from "react";
import { Weather } from "../classes/Weather";

interface DetailedHourlyForecastProps {
    weather: Weather;
}
const DetailedHourlyForecast : FC<DetailedHourlyForecastProps> = 
    ({ weather }): JSX.Element => {
    return (
        <>
        </>
    );
};

export default DetailedHourlyForecast;