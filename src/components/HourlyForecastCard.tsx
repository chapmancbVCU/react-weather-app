/**
 * @file Contains functions related to rendering card containing brief hourly 
 * forecast data.
 * @author Chad Chapman
 */
import { DateTimeUtility } from "../classes/DateTimeUtility";
import "../css/hourlyForecast.css";
import { FC } from "react";
import { HourlyType } from "../types/HourlyType";
import { Weather } from "../classes/Weather";

interface HourlyForecastCardProps {
    hourly: HourlyType;
    dateTimeUtility: DateTimeUtility;
    weather: Weather;
}

const HourlyForecastCard : FC<HourlyForecastCardProps> = ({
        hourly, 
        dateTimeUtility, 
        weather
    }): JSX.Element => {
    return (
        <div className="hourly-forecast-card">
            {hourly.clouds}
        </div>
    );
};

export default HourlyForecastCard;