/**
 * @file Describes functions related hook used for daily forecast state data
 * on daily cards.
 * @author Chad Chapman
 */
import { DateTimeUtility } from "../classes/DateTimeUtility";
import { DailyForecastType } from "../types/DailyForecastType";
import { useEffect, useState } from "react";
import useUnitsToggle from "./useUnitsToggle";
import { Weather } from "../classes/Weather";

const useDailyForecastCard = (dateTimeUtility: DateTimeUtility, daily: DailyForecastType, weather: Weather) => {
    /**
     * @prop Written out time stamp.
     */
    const [dt, setDt] = useState<string>("");

    /**
     * @prop Date in <Day>, <Month> <Day of Month> format.
     */
    const [date, setDate] = useState<string>("");

    /**
     * @prop Icon that describes conditions.
     */
    const [icon, setIcon] = useState<string>("");

    /**
     * @prop Daily high temperature.
     */
    const [highTemperature, setHighTemperature] = useState<number>();

    /**
     * @prop Daily low temperature
     */
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
    }, [dt, toggled]);

    return {
        date,
        icon,
        highTemperature,
        lowTemperature
    }
}

export default useDailyForecastCard;