/**
 * @file Contains functions related to rendering card containing brief daily 
 * forecast data.
 * @author Chad Chapman
 */

import { FC } from "react";
import { Weather } from "../classes/Weather";

interface DailyForecastCardProps {
    weather: Weather;
}

const DailyForecastCard : FC<DailyForecastCardProps> = 
    ({ weather }): JSX.Element => {
    return (
        <>
        </>
    );
};

export default DailyForecastCard;