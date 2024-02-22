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
import useHourlyForecastCard from "../hooks/useHourlyForecastCard";

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

    const {date,
        hourlyFeelsLike,
        hourlyTemperature,
        icon,
        time
    } = useHourlyForecastCard(dateTimeUtility, hourly, weather);

    /**
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);
    
    
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