/**
 * @file Contains functions related to rendering detailed daily forecast.
 * @author Chad Chapman
 */

import { FC } from "react";
import { Weather } from "../classes/Weather";

interface DetailedDailyForecastProps {
    weather: Weather;
}
const DetailedDailyForecast : FC<DetailedDailyForecastProps> = 
    ({ weather }): JSX.Element => {
    return (
        <>
        </>
    );
};

export default DetailedDailyForecast;