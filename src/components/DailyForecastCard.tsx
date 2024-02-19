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
    weather: Weather;
}

const DailyForecastCard : FC<DailyForecastCardProps> = ({
        daily, 
        dateTimeUtility, 
        index,
        weather
    }): JSX.Element => {

    const [dt, setDt] = useState<string>("");

    const [date, setDate] = useState<string>("");

    const [icon, setIcon] = useState<string>("");

    const [highTemperature, setHighTemperature] = useState<number>();

    const [lowTemperature, setLowTemperature] = useState<number>();

    //const setCardContent
    /**
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);
    
    useEffect(() => {
        setDt(dateTimeUtility.getDateTime(daily.dt, daily.timezone_offset)) 
    }, [daily, weather])

    useEffect(() => {
        setDate(dateTimeUtility.getForecastDate(dt));
        setLowTemperature(weather.getTemperature(daily.temp.min));
        setHighTemperature(weather.getTemperature(daily.temp.max));
        setIcon(`https://openweathermap.org/img/wn/${daily.weather.icon}@2x.png`)
    }, [dt, daily, toggled])
    return (
        <div className="daily-forecast-card">
            <h4>{date}</h4>
            <p>{daily.description}</p>
            <img src={icon} alt={daily.description}></img>
            <div className="card-temps" >
                <div>{index}</div>
                <div className="temperature">
                    <h2>{lowTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</h2>
                    <h5>Low</h5>
                </div>
                <div className="temperature">
                    <h2>{highTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</h2>
                    <h5>High</h5>
                </div>
            </div>
        </div>
    );
};

export default DailyForecastCard;