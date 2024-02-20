/**
 * @file Contains functions related to rendering card containing brief hourly 
 * forecast data.
 * @author Chad Chapman
 */
import { DateTimeUtility } from "../classes/DateTimeUtility";
import "../css/hourlyForecast.css";
import { FC, useEffect, useState } from "react";
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

    const [dt, setDt] = useState<string>("");

    const [date, setDate] = useState<string>("");

    const [time, setTime] = useState<string>("");

    useEffect(() => {
        setDt(dateTimeUtility.getDateTime(hourly.dt, hourly.timezone_offset)) 
    }, [hourly])

    useEffect(() => {
        setDate(dateTimeUtility.getForecastDate(dt));
        setTime(dateTimeUtility.getTimeInfo(dt));
    }, [dt, hourly])
    return (
        <div className="hourly-forecast-card">
            <p>{date}</p>
            <p>{time}</p>
        </div>
    );
};

export default HourlyForecastCard;