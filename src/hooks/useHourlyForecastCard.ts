/**
 * @file Describes functions related hook used for hourly forecast state data
 * on hourly cards.
 * @author Chad Chapman
 */
import { DateTimeUtility } from "../classes/DateTimeUtility";
import { HourlyType } from "../types/HourlyType";
import { useEffect, useState } from "react";
import useUnitsToggle from "./useUnitsToggle";
import { Weather } from "../classes/Weather";

const useHourlyForecastCard = (dateTimeUtility: DateTimeUtility, hourly: HourlyType, weather: Weather) => {
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
    }, [dt, toggled]);

    return {
        date,
        hourlyFeelsLike,
        hourlyTemperature,
        icon,
        time
    }
}

export default useHourlyForecastCard;