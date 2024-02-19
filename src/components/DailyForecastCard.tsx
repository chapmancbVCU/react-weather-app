/**
 * @file Contains functions related to rendering card containing brief daily 
 * forecast data.
 * @author Chad Chapman
 */
import "../css/dailyForecast.css";
import { DateTimeUtility } from "../classes/DateTimeUtility";
import { FC, useEffect, useState } from "react";
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

    const [dt, setDt] = useState<string>("");

    const [date, setDate] = useState<string>("");

    useEffect(() => {
        setDt(dateTimeUtility.getDateTime(daily.dt, daily.timezone_offset)) 
    }, [daily, weather])

    useEffect(() => {
        setDate(dateTimeUtility.getForecastDate(dt));
    }, [dt, daily])
    return (
        <div className="daily-forecast-card">
            <h4>{date}</h4>
            <p>{daily.description}</p>
        </div>
    );
};

export default DailyForecastCard;