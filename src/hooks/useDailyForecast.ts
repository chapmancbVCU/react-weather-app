/**
 * @file Describes functions related hook used for daily forecast state 
 * data.
 * @author Chad Chapman
 */
import { DailyForecastType } from "../types/DailyForecastType";
import { useEffect, useState } from "react";

const useDailyForecast = (oneCallData: any) => {
    /**
     * @prop Describes array for DailyForecastCardType.
     */
    const [dailyForecast, setDailyForecast] = useState<DailyForecastType[]>([]);

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

    useEffect(() => {
        setDailyForecastData();
    }, [oneCallData]);

    useEffect(() => {
        logData();
    }, [dailyForecast]);

    return {
        dailyForecast
    }
}

export default useDailyForecast;