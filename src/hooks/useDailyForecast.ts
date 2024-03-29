/**
 * @file Describes functions related hook used for daily forecast state 
 * data.
 * @author Chad Chapman
 */
import { DailyForecastType } from "../types/DailyForecastType";
import { DateTimeUtility } from "../classes/DateTimeUtility";
import { useEffect, useState } from "react";
import { Weather } from "../classes/Weather";

/**
 * Functions supporting DailyForecastType Array.
 * @param oneCallData Use this data to populate array of DailyForecastType.
 * @returns { DailyForecastType[] } Array of Daily/forecastType
 */
const useDailyForecast = (dateTimeUtility: DateTimeUtility, oneCallData: any, toggled: boolean, weather: Weather) => {
    /**
     * @prop Describes array for DailyForecastCardType.
     */
    const [dailyForecast, setDailyForecast] = useState<DailyForecastType[]>([]);

    /**
     * @prop The selected card which is of type DailyForecastType.
     */
    const [selectedCard, setSelectedCard] = useState<DailyForecastType>();

    /**
     * @prop The temperature for the selected card.
     */
    const [selectedCardTemp, setSelectedCardTemp] = useState<number>();

    /**
     * @prop Date for selected card on format <Day of week>, <Month> 
     * <Day of Month>
     */
    const [selectedDate, setSelectedDate] = useState<string>("");

    /**
     * @prop The dew point for the selected card.
     */
    const [selectedDewPoint, setSelectedDewPoint] = useState<number>();

    /**
     * @prop String for date converted from Unix time. 
     */
    const [selectedDt, setSelectedDt] = useState<string>("");

    /**
     * @prop The evening temperature for the selected card.
     */
    const [selectedEveTemp, setSelectedEveTemp] = useState<number>();

    /**
     * @prop The daytime feels like temperature for the selected card.
     */
    const [selectedFLDayTemp, setSelectedFLDayTemp] = useState<number>();

    /**
     * @prop The evening feels like temperature for the selected card.
     */
    const [selectedFLEveTemp, setSelectedFLEveTemp] = useState<number>();

    /**
     * @prop The morning feels like temperature for the selected card.
     */
    const [selectedFLMornTemp, setSelectedFLMornTemp] = useState<number>();

    /**
     * @prop The night time feels like temperature for the selected card.
     */
    const [selectedFLNightTemp, setSelectedFLNightTemp] = useState<number>();

    /**
     * @prop High temperature for selected card.
     */
    const [selectedHighTemp, setSelectedHighTemp] = useState<number>();

    /**
     * @prop Describes time the moon rises.
     */
    const [selectedMoonRise, setSelectedMoonRise] = useState<string>("");

    /**
     * @prop Describes time when moon sets.
     */
    const [selectedMoonSet, setSelectedMoonSet] = useState<string>("");

    /**
     * @prop Morning temperature for the selected card.
     */
    const [selectedMornTemp, setSelectedMornTemp] = useState<number>();

    /**
     * @prop Night time temperature for the selected card.
     */
    const [selectedNightTemp, setSelectedNightTemp] = useState<number>();

    /**
     * @prop Icon for selected card.
     */
    const [selectedIcon, setSelectedIcon] = useState<string>();

    /**
     * @prop Low temperature for selected card.
     */
    const [selectedLowTemp, setSelectedLowTemp] = useState<number>();

    /**
     * @prop Rain volume in mm.
     */
    const [selectedRain, setSelectedRain] = useState<number>();

    /**
     * @prop The summary for selected card.
     */
    const [selectedSummary, setSelectedSummary] = useState<string>("");

    /**
     * @prop Describes time the sun rises.
     */
    const [selectedSunRise, setSelectedSunRise] = useState<string>("");

    /**
     * @prop Describes time the sun sets.
     */
    const [selectedSunSet, setSelectedSunSet] = useState<string>("");

    /**
     * @prop The ultraviolet index for the selected card.
     */
    const [selectedUVI, setSelectedUVI] = useState<string>("");

    /**
     * @prop Wind degrees for selected card.
     */
    const [selectedWindDegrees, setSelectedWindDegrees] = useState<number>();

    /**
     * @prop Wind gust for selected card.
     */
    const [selectedWindGust, setSelectedWindGust] = useState<string>("");

    /**
     * @prop Wind speed for selected card.
     */
    const [selectedWindSpeed, setSelectedWindSpeed] = useState<string>("");

    /**
     * Function for logging test data for debugging".
     */
    const logData = () => {
        console.log("forecast card type");
        for(let i: number = 0; i < 2; i++) {
            console.log(`Clouds: ${dailyForecast[i]?.clouds}`);
            console.log(`Description: ${dailyForecast[i]?.description}`);
            console.log(`Dew Point: ${dailyForecast[i]?.dew_point}`);
            console.log(`DT: ${dailyForecast[i]?.dt}`);
            console.log(`Feels Like Day: ${dailyForecast[i]?.feels_like.day}`);
            console.log(`Feels Like Eve: ${dailyForecast[i]?.feels_like.eve}`);
            console.log(`Feels Like Morn: ${dailyForecast[i]?.feels_like.morn}`);
            console.log(`Feels Like Night: ${dailyForecast[i]?.feels_like.night}`);
            console.log(`Humidity: ${dailyForecast[i]?.humidity}`);
            console.log(`Icon: ${dailyForecast[i]?.icon}`);
            console.log(`Moon Phase: ${dailyForecast[i]?.moon_phase}`);
            console.log(`Moonrise: ${dailyForecast[i]?.moonrise}`);
            console.log(`Moonset: ${dailyForecast[i]?.moonset}`);
            console.log(`POP: ${dailyForecast[i]?.pop}`);
            console.log(`Pressure: ${dailyForecast[i]?.pressure}`);
            console.log(`Rain: ${dailyForecast[i]?.rain}`);
            console.log(`Summary: ${dailyForecast[i]?.summary}`);
            console.log(`Sunrise: ${dailyForecast[i]?.sunrise}`);
            console.log(`Sunset: ${dailyForecast[i]?.sunset}`);
            console.log(`Temp Day: ${dailyForecast[i]?.temp.day}`);
            console.log(`Temp Eve: ${dailyForecast[i]?.temp.eve}`);
            console.log(`Temp Max: ${dailyForecast[i]?.temp.max}`);
            console.log(`Temp Min: ${dailyForecast[i]?.temp.min}`);
            console.log(`Temp Morn: ${dailyForecast[i]?.temp.morn}`);
            console.log(`Temp Night: ${dailyForecast[i]?.temp.night}`);
            console.log(`Timezone Offset: ${dailyForecast[i]?.timezone_offset}`);
            console.log(`UVI: ${dailyForecast[i]?.uvi}`);
            console.log(`Weather Description: ${dailyForecast[i]?.weather.description}`);
            console.log(`Weather Icon: ${dailyForecast[i]?.weather.icon}`);
            console.log(`Wind Deg: ${dailyForecast[i]?.wind_deg}`);
            console.log(`Wind Gust: ${dailyForecast[i]?.wind_gust}`);
            console.log(`Wind Speed: ${dailyForecast[i]?.wind_speed}`);
            console.log("-------------------");
        }
    }

    /**
     * Event listener that sets value of selected card when a card is clicked.
     * @param e Value associated with event.
     */
    const onCardClick = (e: number) => {
        setSelectedCard(dailyForecast[e]);
    }

    /**
     * Setup DailyForecastCard array for handling data for daily forecast 
     * cards.
     */
    const setDailyForecastData = () => {
        let typeArray: DailyForecastType[] = []; 
        for (let i: number = 0; i < 8; i++) {
            let setData: DailyForecastType = {
                clouds: oneCallData?.daily[i]?.clouds,
                description: oneCallData?.daily[i]?.weather[0].description,
                dew_point: oneCallData?.daily[i]?.dew_point,
                dt: oneCallData?.daily[i]?.dt,
                feels_like: {
                    day: oneCallData?.daily[i]?.feels_like.day,
                    eve: oneCallData?.daily[i]?.feels_like.eve,
                    morn: oneCallData?.daily[i]?.feels_like.morn,
                    night: oneCallData?.daily[i]?.feels_like.night,
                },
                humidity: oneCallData?.daily[i]?.humidity,
                icon: oneCallData?.daily[i]?.weather[0].icon,
                moon_phase: oneCallData?.daily[i]?.moon_phase,
                moonrise: oneCallData?.daily[i]?.moonrise,
                moonset: oneCallData?.daily[i]?.moonset,
                pop: oneCallData?.daily[i]?.pop,
                pressure: oneCallData?.daily[i]?.pressure,
                rain: oneCallData?.daily[i]?.rain,
                summary: oneCallData?.daily[i]?.summary,
                sunrise: oneCallData?.daily[i]?.sunrise,
                sunset: oneCallData?.daily[i]?.sunset,
                temp: {
                    day: oneCallData?.daily[i]?.temp.day,
                    eve: oneCallData?.daily[i]?.temp.eve,
                    max: oneCallData?.daily[i]?.temp.max,
                    min: oneCallData?.daily[i]?.temp.min,
                    morn: oneCallData?.daily[i]?.temp.morn,
                    night: oneCallData?.daily[i]?.temp.night
                },
                timezone_offset: oneCallData?.timezone_offset,
                uvi: oneCallData?.daily[i]?.uvi,
                weather: {
                    description: oneCallData?.daily[i].weather[0].description,
                    icon: oneCallData?.daily[i].weather[0].icon,
                },
                wind_deg: oneCallData?.daily[i]?.wind_deg,
                wind_gust: oneCallData?.daily[i]?.wind_gust,
                wind_speed: oneCallData?.daily[i]?.wind_speed,
            }
            typeArray.push(setData);
        }
        setDailyForecast(typeArray);
    }

    /**
     * Describes the time that the sun rises.
     */
    const setSunRiseTime = (): void => {
        const time = dateTimeUtility.getDateTime(
            selectedCard?.sunrise!, selectedCard?.timezone_offset);
        setSelectedSunRise(dateTimeUtility.getTimeInfo(time));
    }

    /**
     * Describes the time that the sun sets.
     */
    const setSunSetTime = (): void => {
        const time = dateTimeUtility.getDateTime(
            selectedCard?.sunset!, selectedCard?.timezone_offset);
        setSelectedSunSet(dateTimeUtility.getTimeInfo(time));
    }

    /**
     * Sets amount of rain.  Handles case where value is undefined and set 
     * value to 0.
     */
    const setRain = () => {
        if(selectedCard?.rain == null) {
            setSelectedRain(0);
        } else {
            setSelectedRain(selectedCard?.rain);
        }
    }

    /**
     * Sets time that the moon rises.
     */
    const setMoonRiseTime = (): void => {
        const time = dateTimeUtility.getDateTime(
            selectedCard?.moonrise!, selectedCard?.timezone_offset);
        setSelectedMoonRise(dateTimeUtility.getTimeInfo(time));
    }

    /**
     * Sets time that the moon sets.
     */
    const setMoonSetTime = (): void => {
        const time = dateTimeUtility.getDateTime(
            selectedCard?.moonset!, selectedCard?.timezone_offset);
        setSelectedMoonSet(dateTimeUtility.getTimeInfo(time));
    }

    useEffect(() => {
        setDailyForecastData();
    }, [oneCallData]);

    useEffect(() => {
        setSelectedCard(dailyForecast[0]);
        logData();
    }, [dailyForecast]);

    useEffect(() => {
        setSelectedDt(dateTimeUtility.getDateTime(selectedCard?.dt!, oneCallData?.timezone_offset));
        setSelectedDate(dateTimeUtility.getForecastDate(selectedDt));

        // Temperatures
        setSelectedCardTemp(weather.getTemperature(selectedCard?.temp.day));
        setSelectedDewPoint(weather.getTemperature(selectedCard?.dew_point));
        setSelectedEveTemp(weather.getTemperature(selectedCard?.temp.eve));
        setSelectedHighTemp(weather.getTemperature(selectedCard?.temp.max));
        setSelectedLowTemp(weather.getTemperature(selectedCard?.temp.min));
        setSelectedMornTemp(weather.getTemperature(selectedCard?.temp.morn));
        setSelectedNightTemp(weather.getTemperature(selectedCard?.temp.night));

        // Feels like
        setSelectedFLDayTemp(weather.getTemperature(selectedCard?.feels_like.day));
        setSelectedFLEveTemp(weather.getTemperature(selectedCard?.feels_like.eve));
        setSelectedFLMornTemp(weather.getTemperature(selectedCard?.feels_like.morn));
        setSelectedFLNightTemp(weather.getTemperature(selectedCard?.feels_like.night));

        // Winds
        setSelectedWindDegrees(weather.getWindDirection(selectedCard?.wind_deg!));
        setSelectedWindGust(weather.getWindSpeed(selectedCard?.wind_gust!, toggled));
        setSelectedWindSpeed(weather.getWindSpeed(selectedCard?.wind_speed!, toggled));
        setSelectedIcon(selectedCard?.icon);
        setSelectedSummary(selectedCard?.summary!);

        setSelectedUVI(selectedCard?.uvi?.toFixed(0)!);
        setRain();

        // Moon and sun props.
        setSunRiseTime();
        setSunSetTime();
        setMoonRiseTime();
        setMoonSetTime();
    }, [selectedCard, toggled, selectedDt]);

    return {
        dailyForecast,
        onCardClick,
        selectedCard,
        selectedCardTemp,
        selectedDate,
        selectedDewPoint,
        selectedFLDayTemp,
        selectedFLEveTemp,
        selectedFLMornTemp,
        selectedFLNightTemp,
        selectedEveTemp,
        selectedHighTemp,
        selectedMoonRise,
        selectedMoonSet,
        selectedMornTemp,
        selectedNightTemp,
        selectedIcon,
        selectedLowTemp,
        selectedRain,
        selectedSummary,
        selectedSunRise,
        selectedSunSet,
        selectedUVI,
        selectedWindGust,
        selectedWindSpeed,
        selectedWindDegrees,
    }
}

export default useDailyForecast;