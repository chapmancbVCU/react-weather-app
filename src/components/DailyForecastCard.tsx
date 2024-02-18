/**
 * @file Contains functions related to rendering card containing brief daily 
 * forecast data.
 * @author Chad Chapman
 */
import { DateTimeUtility } from "../classes/DateTimeUtility";
import { FC } from "react";
import { Weather } from "../classes/Weather";
import { DailyForecastType } from "../types/DailyForecastType";

interface DailyForecastCardProps {
    daily: DailyForecastType;
    dateTimeUtility: DateTimeUtility;
    weather: Weather;
}

const DailyForecastCard : FC<DailyForecastCardProps> = ({
        daily, 
        dateTimeUtility, 
        weather
    }): JSX.Element => {
    return (
        <div className="daily-forecast-card">
            {daily.clouds}
        </div>
    );
};

export default DailyForecastCard;