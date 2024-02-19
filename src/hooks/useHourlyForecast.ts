/**
 * @file Describes functions related hook used for hourly forecast state 
 * data.
 * @author Chad Chapman
 */
import { HourlyType } from "../types/HourlyType";
import { useEffect, useState } from "react";

const useHourlyForecast = (oneCallData: any) => {

    const [hourlyForecast, setHourlyForecast] = useState<HourlyType[]>([]);

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

    useEffect(() => {
        setHourlyForecastData();
    }, [oneCallData]);

    useEffect(() => {
        logData();
    }, [hourlyForecast]);

    return {
        hourlyForecast
    }
}

export default useHourlyForecast