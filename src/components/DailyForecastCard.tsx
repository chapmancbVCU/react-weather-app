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
import useUnitsToggle from "../hooks/useUnitsToggle";
import useDailyForecastCard from "../hooks/useDailyForecastCard";

interface DailyForecastCardProps {
    daily: DailyForecastType;
    dateTimeUtility: DateTimeUtility;
    index: number;
    onCardClick: any
    weather: Weather;
}

const DailyForecastCard : FC<DailyForecastCardProps> = ({
        daily, 
        dateTimeUtility, 
        index,
        onCardClick,
        weather
    }): JSX.Element => {

    const {
        date,
        icon,
        highTemperature,
        lowTemperature
    } = useDailyForecastCard(dateTimeUtility, daily, weather);

    /**
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);
    
    return (
        <button className="daily-forecast-card" onClick={() => onCardClick(index)}>
            <h4>{date}</h4>
            <p>{daily.description}</p>
            <img src={icon} alt={daily.description}></img>
            <div className="card-temps">
                <div className="temperature">
                    <h2>{lowTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</h2>
                    <h5>Low</h5>
                </div>
                <div className="temperature">
                    <h2>{highTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</h2>
                    <h5>High</h5>
                </div>
            </div>
        </button>
    );
};

export default DailyForecastCard;