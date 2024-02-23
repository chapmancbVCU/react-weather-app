/**
 * @file Describes functions related hook used for hourly forecast state 
 * data.
 * @author Chad Chapman
 */
import { DateTimeUtility } from "../classes/DateTimeUtility";
import { HourlyType } from "../types/HourlyType";
import { useEffect, useState } from "react";
import { Weather } from "../classes/Weather";

const useHourlyForecast = (dateTimeUtility: DateTimeUtility, oneCallData: any, toggled: boolean, weather: Weather) => {
    /**
     * @prop Describes array of HourlyType.
     */
    const [hourlyForecast, setHourlyForecast] = useState<HourlyType[]>([]);

    /**
     * @prop The selected card which is of type DailyForecastType.
     */
    const [selectedCard, setSelectedCard] = useState<HourlyType>();

    /**
     * @prop Feels like for selected card.
     */
    const [selectedCardFeelsLike, setSelectedCardFeelsLike] = useState<number>();

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
     * @prop Description of weather for selected card.
     */
    const [selectedDescription, setSelectedDescription] = useState<string>("");

    /**
     * @prop String for date converted from Unix time. 
     */
    const [selectedDt, setSelectedDt] = useState<string>("");

    /**
     * @prop Icon for selected card.
     */
    const [selectedIcon, setSelectedIcon] = useState<string>();

    /**
     * @prop String for displaying time of day of selected card.
     */
    const [selectedTime, setSelectedTime] = useState<string>("");

    const logData = () => {
        console.log("hourly card type");
        for(let i: number = 0; i < 1; i++) {
            console.log("Clouds: " + hourlyForecast[i]?.clouds);
            console.log("Dew Point: " + hourlyForecast[i]?.dew_point);
            console.log(`DT: ${hourlyForecast[i]?.dt}`);
            console.log("Feels Like: " + hourlyForecast[i]?.feels_like);
            console.log("Humidity: " + hourlyForecast[i]?.humidity);
            console.log("POP: " + hourlyForecast[i]?.pop);
            console.log("Pressure: " + hourlyForecast[i]?.pressure);
            console.log("Temp: " + hourlyForecast[i]?.temp);
            console.log("UVI: " + hourlyForecast[i]?.uvi);
            console.log("Visibility: " + hourlyForecast[i]?.visibility);
            console.log(`Description: ${hourlyForecast[i]?.weather.description}`);
            console.log(`Icon: ${hourlyForecast[i]?.weather.icon}`);
            console.log(`Timezone Offset: ${hourlyForecast[i]?.timezone_offset}`);
            console.log("Wind Deg: " + hourlyForecast[i]?.wind_deg);
            console.log("Wind Gust: " + hourlyForecast[i]?.wind_gust);
            console.log("Wind Speed: " + hourlyForecast[i]?.wind_speed);
            console.log("-------------------");
        };
    }

    /**
     * Setup HourlyForecast array for handling data for hourly forecast 
     * cards.
     */
    const setHourlyForecastData = () => {
        console.log("hourly card type");
        const typeArray: HourlyType[] = []; 
        for (let i: number = 0; i < 48; i++) {
            const setData: HourlyType = {
                clouds: oneCallData?.hourly[i]?.clouds,
                dew_point: oneCallData?.hourly[i]?.dew_point,
                dt: oneCallData?.hourly[i]?.dt,
                feels_like: oneCallData?.hourly[i]?.feels_like,
                humidity: oneCallData?.hourly[i]?.humidity,
                pop: oneCallData?.hourly[i]?.pop,
                pressure: oneCallData?.hourly[i]?.pressure,
                temp: oneCallData?.hourly[i]?.temp,
                uvi: oneCallData?.hourly[i]?.uvi,
                timezone_offset: oneCallData?.timezone_offset,
                visibility: oneCallData?.hourly[i]?.visibility,
                weather: {
                    description: oneCallData?.hourly[i].weather[0].description,
                    icon: oneCallData?.hourly[i].weather[0].icon
                },
                wind_deg: oneCallData?.hourly[i]?.wind_deg,
                wind_gust: oneCallData?.hourly[i]?.wind_gust,
                wind_speed: oneCallData?.hourly[i]?.wind_speed
            }
            typeArray.push(setData);
        }
        setHourlyForecast(typeArray);
    }

    /**
     * Event listener that sets value of selected card when a card is clicked.
     * @param e Value associated with event.
     */
    const onCardClick = (e: number) => {
        setSelectedCard(hourlyForecast[e]);
    }

    useEffect(() => {
        setHourlyForecastData();
    }, [oneCallData]);

    useEffect(() => {
        setSelectedCard(hourlyForecast[0]);
        logData();
    }, [hourlyForecast]);

    useEffect(() => {
        setSelectedDt(dateTimeUtility.getDateTime(selectedCard?.dt!, oneCallData?.timezone_offset));
        setSelectedDate(dateTimeUtility.getForecastDate(selectedDt));
        setSelectedTime(dateTimeUtility.getTimeInfo(selectedDt));

        // Set temperatures
        setSelectedCardTemp(weather.getTemperature(selectedCard?.temp));
        setSelectedCardFeelsLike(weather.getTemperature(selectedCard?.feels_like));

        setSelectedDescription(selectedCard?.weather.description!);
        setSelectedIcon(selectedCard?.weather.icon);

    }, [selectedCard, toggled, selectedDt]);
    return {
        hourlyForecast,
        onCardClick,
        selectedCard,
        selectedDescription,
        selectedCardFeelsLike,
        selectedIcon,
        selectedCardTemp,
        selectedDate,
        selectedTime
    }
}

export default useHourlyForecast