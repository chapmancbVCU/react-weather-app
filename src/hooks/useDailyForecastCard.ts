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
    }, [dt, toggled]);

    return {
        date,
        icon,
        highTemperature,
        lowTemperature
    }
}

export default useDailyForecastCard;