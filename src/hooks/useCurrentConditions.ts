/**
 * @file Manages hooks and props for current day forecast data.
 * @author Chad Chapman
 */
import { DateTimeUtility } from "../classes/DateTimeUtility";
import { useEffect, useState } from "react";
import { Weather } from "../classes/Weather";

const useCurrentConditions = (dateTimeUtility: DateTimeUtility, freeTierData: any, oneCallData: any, weather: Weather, toggled: boolean) => {
    /**
     * @prop Description of current conditions outside.
     */
    const [currentConditions, setCurrentConditions] = useState<string>();

    /**
     * @prop Describes day time temperature.
     */
    const [dayTemperature, setDayTemperature] = useState<number>();

    /**
     * @prop Describes day time feels like temperature.
     */
    const [dayFeelsLikeTemperature, setDayFeelsLikeTemperature] = useState<number>();

    /**
     * @prop Describes evening temperature.
     */
    const [eveningTemperature, setEveningTemperature] = useState<number>();

    /**
     * @prop Describes evening feels like temperature.
     */
    const [eveningFeelsLikeTemperature, setEveningFeelsLikeTemperature] = useState<number>();

    /**
     * @prop Temperature for dew point.
     */
    const [dewPoint, setDewPoint] = useState<number>();

    /**
     * @prop Property for feels like temperature.
     */
    const [feelsLikeTemperature, setFeelsLikeTemperature] = useState<string>("");

    /**
     * @prop Current day high temperature.
     */
    const [highTemperature, setHighTemperature] = useState<number>();

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
     * Capitalize first letter of each word of current conditions description.
     */
    const setCurrentConditionsProps = async (): Promise<void> => {
        const currentConditions: string = await freeTierData?.weather[0].description;
        console.log("current conditions:");
        console.log(currentConditions);
        const wordsArray: string[] = currentConditions.split(" ");
        for(let i: number = 0; i < wordsArray.length; i++) {
            wordsArray[i] = wordsArray[i][0].toUpperCase() + wordsArray[i].substring(1);
        }

        setCurrentConditions(wordsArray.join(" "));
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
        // Temperature props.
        setTemperature(weather.calculateTemperature(freeTierData?.main.temp));
        setFeelsLikeTemperature(weather.calculateTemperature(
            freeTierData?.main.feels_like));
        setHighTemperature(weather.calculateTemperature(freeTierData?.main.temp_max));
        setLowTemperature(weather.calculateTemperature(freeTierData?.main.temp_min));

        setMorningTemperature(weather.getTemperature(oneCallData?.daily[0].temp.morn));
        setDayTemperature(weather.getTemperature(oneCallData?.daily[0].temp.day));
        setEveningTemperature(weather.getTemperature(oneCallData?.daily[0].temp.eve));
        setNightTemperature(weather.getTemperature(oneCallData?.daily[0].temp.night));

        setMorningFeelsLikeTemperature(weather.getTemperature(oneCallData?.daily[0].feels_like.morn));
        setDayFeelsLikeTemperature(weather.getTemperature(oneCallData?.daily[0].feels_like.day));
        setEveningFeelsLikeTemperature(weather.getTemperature(oneCallData?.daily[0].feels_like.eve));
        setNightFeelsLikeTemperature(weather.getTemperature(oneCallData?.daily[0].feels_like.night));

        setDewPoint(weather.getTemperature(oneCallData?.current.dew_point));
        setCurrentConditionsProps();

        // Moon and sun props.
        setSunRiseTime();
        setSunSetTime();
        setMoonRiseTime();
        setMoonSetTime();
    }, [weather, freeTierData, oneCallData, toggled]);

    return {
        currentConditions,
        dayTemperature,
        dayFeelsLikeTemperature,
        eveningTemperature,
        eveningFeelsLikeTemperature,
        dewPoint,
        feelsLikeTemperature,
        highTemperature,
        lowTemperature,
        moonRise,
        moonSet,
        morningTemperature,
        morningFeelsLikeTemperature,
        nightTemperature,
        nightFeelsLikeTemperature,
        sunRise,
        sunSet,
        temperature,
    };
};

export default useCurrentConditions;