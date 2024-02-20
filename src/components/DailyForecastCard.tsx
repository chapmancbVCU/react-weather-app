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

    const [dt, setDt] = useState<string>("");

    const [date, setDate] = useState<string>("");

    const [icon, setIcon] = useState<string>("");

    const [highTemperature, setHighTemperature] = useState<number>();

    const [lowTemperature, setLowTemperature] = useState<number>();

    /**
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);
    
    useEffect(() => {
        setDt(dateTimeUtility.getDateTime(daily.dt, daily.timezone_offset)) 
    }, [daily])

    useEffect(() => {
        setDate(dateTimeUtility.getForecastDate(dt));
        setLowTemperature(weather.getTemperature(daily.temp.min));
        setHighTemperature(weather.getTemperature(daily.temp.max));
        setIcon(`https://openweathermap.org/img/wn/${daily.weather.icon}@2x.png`)
    }, [dt, toggled])
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