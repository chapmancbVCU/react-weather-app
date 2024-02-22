/**
 * @file Contains functions related to rendering card containing brief hourly 
 * forecast data.
 * @author Chad Chapman
 */
import { DateTimeUtility } from "../classes/DateTimeUtility";
import "../css/hourlyForecast.css";
import { FC, useEffect, useState } from "react";
import { HourlyType } from "../types/HourlyType";
import useUnitsToggle from "../hooks/useUnitsToggle";
import { Weather } from "../classes/Weather";

interface HourlyForecastCardProps {
    index: number
    hourly: HourlyType;
    dateTimeUtility: DateTimeUtility;
    onCardClick: any;
    weather: Weather;
}

const HourlyForecastCard : FC<HourlyForecastCardProps> = ({
        index,
        hourly, 
        dateTimeUtility, 
        onCardClick,
        weather
    }): JSX.Element => {

    const [dt, setDt] = useState<string>("");

    const [date, setDate] = useState<string>("");

    const [hourlyFeelsLike, setHourlyFeelsLike] = useState<number>();

    const [hourlyTemperature, setHourlyTemperature] = useState<number>();

    const [icon, setIcon] = useState<string>("");

    const [time, setTime] = useState<string>("");

    /**
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);
    
    useEffect(() => {
        setDt(dateTimeUtility.getDateTime(hourly.dt, hourly.timezone_offset)) 
    }, [hourly])

    useEffect(() => {
        setDate(dateTimeUtility.getForecastDate(dt));
        setTime(dateTimeUtility.getTimeInfo(dt));
        setHourlyTemperature(weather.getTemperature(hourly.temp));
        setHourlyFeelsLike(weather.getTemperature(hourly.feels_like));
        setIcon(`https://openweathermap.org/img/wn/${hourly.weather.icon}@2x.png`)
    }, [dt, toggled])
    return (
        <button className="hourly-forecast-card" onClick={() => onCardClick(index)}>
            <h4 className="hourly-card-date">{date}</h4>
            <h4>{time}</h4>
            <h2 className="card-temperature">{hourlyTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</h2>
            <div className="card-temperature">
                <h2>{hourlyFeelsLike} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</h2>
                <h4>Feels Like</h4>
            </div>
            <img src={icon} alt={hourly.weather.description}></img>
            <p className="hourly-card-description">{hourly.weather.description}</p>
        </button>
    );
};

export default HourlyForecastCard;