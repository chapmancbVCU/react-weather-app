/**
 * @file Manages hooks and props for current day forecast data.
 * @author Chad Chapman
 */
import { DateTimeUtility } from "../classes/DateTimeUtility";
import { useEffect, useState } from "react";
import { Weather } from "../classes/Weather";

const useCurrentConditions = (dateTimeUtility: DateTimeUtility, freeTierData: any, oneCallData: any, weather: Weather, toggled: boolean) => {
    
    
    const [conditionIcon, setConditionIcon] = useState<string>("");
    
    /**
     * @prop Description of current conditions outside.
     */
    const [currentConditions, setCurrentConditions] = useState<string>();

    /**
     * @prop for date in the following format: 
     * <day_of_week>, <month> <day_of_month>, <year>.
     */
    const [date, setDate] = useState<string>("");

    /**
     * @prop Date time string derived from Unix time.
     */
    const [dateTimeStamp, setDateTimeStamp] = useState<string>("");

    /**
     * @prop Describes day time temperature.
     */
    const [dayTemperature, setDayTemperature] = useState<number>();

    /**
     * @prop Describes day time feels like temperature.
     */
    const [dayFeelsLikeTemperature, setDayFeelsLikeTemperature] = useState<number>();

    /**
     * @prop Temperature for dew point.
     */
    const [dewPoint, setDewPoint] = useState<number>();

    /**
     * @prop Describes evening temperature.
     */
    const [eveningTemperature, setEveningTemperature] = useState<number>();

    /**
     * @prop Describes evening feels like temperature.
     */
    const [eveningFeelsLikeTemperature, setEveningFeelsLikeTemperature] = useState<number>();

    /**
     * @prop Property for feels like temperature.
     */
    const [feelsLikeTemperature, setFeelsLikeTemperature] = useState<string>("");

    /**
     * @prop Represents time forecast data was fetched for a particular location.
     */
    const [forecastTime, setForecastTime] = useState<string>("");

    /**
     * @prop Current day high temperature.
     */
    const [highTemperature, setHighTemperature] = useState<number>();

    /**
     * @prop The current time.
     */
    const [localTime, setLocalTime] = useState<Date>(new Date());

    /**
     * @prop Current day low temperature.
     */
    const [lowTemperature, setLowTemperature] = useState<number>();

    /**
     * @prop Describes time the moon rises.
     */
    const [moonRise, setMoonRise] = useState<string>("");

    /**
     * @prop Describes time when moon sets.
     */
    const [moonSet, setMoonSet] = useState<string>("");

    /**
     * @prop Describes morning temperature.
     */
    const [morningTemperature, setMorningTemperature] = useState<number>();

    /**
     * @prop Describes morning feels like temperature.
     */
    const [morningFeelsLikeTemperature, setMorningFeelsLikeTemperature] = useState<number>();

    /**
     * @prop Describes night time temperature.
     */
    const [nightTemperature, setNightTemperature] = useState<number>();

    /**
     * @prop Describes night time feels like temperature.
     */
    const [nightFeelsLikeTemperature, setNightFeelsLikeTemperature] = useState<number>();

    /**
     * @prop The chance of precipitation.
     */
    const [pop, setPop] = useState<string>("");

    /**
     * @prop The summary for today's weather.
     */
    const [summary, setSummary] = useState<string>("");

    /**
     * @prop Describes time the sun rises.
     */
    const [sunRise, setSunRise] = useState<string>("");

    /**
     * @prop Describes time the sun sets.
     */
    const [sunSet, setSunSet] = useState<string>("");

    /**
     * @prop Property for current temperature.
     */
    const [temperature, setTemperature] = useState<number>();

    /**
     * @prop Property for ultraviolet index.
     */
    const [uvi, setUVI] = useState<number>();

    const [windGust, setWindGust] = useState<string>("");

    /**
     * Capitalize first letter of each word of current conditions description.
     */
    const setCurrentConditionsProps = async (): Promise<void> => {
        const currentConditions: string = await freeTierData?.weather[0]?.description!;
        // console.log("current conditions:");
        // console.log(currentConditions);
        const wordsArray: string[] = currentConditions?.split(" ");
        for(let i: number = 0; i < wordsArray?.length; i++) {
            wordsArray[i] = wordsArray[i][0].toUpperCase() + wordsArray[i].substring(1);
        }

        setCurrentConditions(wordsArray?.join(" "));
    }

    /**
     * Gets date time stamp from one call data and sets date as string using 
     * the format: <day_of_week>, <month> <day_of_month>, <year>.
     */
    const setCurrentDate = (): void => {
        setDate(dateTimeUtility.getDateInfo(dateTimeStamp));
    }

    /**
     * Sets date-time stamp for GMT.
     */
    const setDateTime = (): void => {
        setDateTimeStamp(dateTimeUtility.getDateTime(
            oneCallData?.current?.dt, oneCallData?.timezone_offset));
    }

    /**
     * Sets the time for location we are fetching data.
     */
    const setForecastTimeInformation = (): void => {
        setForecastTime(dateTimeUtility.getTimeInfo(dateTimeStamp));
    }

    /**
     * Sets time that the moon rises.
     */
    const setMoonRiseTime = (): void => {
        const time = dateTimeUtility.getDateTime(
            oneCallData?.daily[0].moonrise, oneCallData?.timezone_offset);
        setMoonRise(dateTimeUtility.getTimeInfo(time));
    }

    /**
     * Sets time that the moon sets.
     */
    const setMoonSetTime = (): void => {
        const time = dateTimeUtility.getDateTime(
            oneCallData?.daily[0].moonset, oneCallData?.timezone_offset);
        setMoonSet(dateTimeUtility.getTimeInfo(time));
    }

    /**
     * Describes the time that the sun rises.
     */
    const setSunRiseTime = (): void => {
        const time = dateTimeUtility.getDateTime(
            oneCallData?.daily[0].sunrise, oneCallData?.timezone_offset);
        setSunRise(dateTimeUtility.getTimeInfo(time));
    }

    /**
     * Describes the time that the sun sets.
     */
    const setSunSetTime = (): void => {
        const time = dateTimeUtility.getDateTime(
            oneCallData?.daily[0].sunset, oneCallData?.timezone_offset);
        setSunSet(dateTimeUtility.getTimeInfo(time));
    }

    useEffect(() => {
        // Set time to be rendered and refresh every second.
        setInterval(() => setLocalTime(new Date()), 1000);
        setDateTime();
        setForecastTimeInformation();
        setCurrentDate();

        // Temperature props.
        setTemperature(weather.calculateTemperature(freeTierData?.main.temp));
        setFeelsLikeTemperature(weather.calculateTemperature(
            freeTierData?.main.feels_like));
        setHighTemperature(weather.calculateTemperature(freeTierData?.main.temp_max));
        setLowTemperature(weather.calculateTemperature(freeTierData?.main.temp_min));

        setMorningTemperature(weather.getTemperature(oneCallData?.daily[0]?.temp.morn));
        setDayTemperature(weather.getTemperature(oneCallData?.daily[0].temp.day));
        setEveningTemperature(weather.getTemperature(oneCallData?.daily[0].temp.eve));
        setNightTemperature(weather.getTemperature(oneCallData?.daily[0].temp.night));

        setMorningFeelsLikeTemperature(weather.getTemperature(oneCallData?.daily[0].feels_like.morn));
        setDayFeelsLikeTemperature(weather.getTemperature(oneCallData?.daily[0].feels_like.day));
        setEveningFeelsLikeTemperature(weather.getTemperature(oneCallData?.daily[0].feels_like.eve));
        setNightFeelsLikeTemperature(weather.getTemperature(oneCallData?.daily[0].feels_like.night));

        setDewPoint(weather.getTemperature(oneCallData?.current.dew_point));
        setCurrentConditionsProps();

        setSummary(oneCallData?.daily[0].summary);
        setPop((oneCallData?.daily[0]?.pop * 100).toFixed(0));

        setWindGust(weather.getWindSpeed(oneCallData?.daily[0].wind_gust, toggled));

        setUVI((oneCallData?.daily[0].uvi.toFixed(0)));
        setConditionIcon(`https://openweathermap.org/img/wn/${freeTierData?.weather[0].icon}@2x.png`);

        // Moon and sun props.
        setSunRiseTime();
        setSunSetTime();
        setMoonRiseTime();
        setMoonSetTime();
    }, [weather, freeTierData, oneCallData, toggled, currentConditions]);

    return {
        conditionIcon,
        currentConditions,
        date,
        dayTemperature,
        dayFeelsLikeTemperature,
        eveningTemperature,
        eveningFeelsLikeTemperature,
        dewPoint,
        feelsLikeTemperature,
        forecastTime,
        highTemperature,
        localTime,
        lowTemperature,
        moonRise,
        moonSet,
        morningTemperature,
        morningFeelsLikeTemperature,
        nightTemperature,
        nightFeelsLikeTemperature,
        pop,
        summary,
        sunRise,
        sunSet,
        temperature,
        uvi,
        windGust
    };
};

export default useCurrentConditions;