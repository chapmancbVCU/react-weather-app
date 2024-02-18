/**
 * @file Defines simplified data for daily forecast card.
 * @author Chad Chapman
 */

export type DailyForecastType = {
    clouds: number
    description: string
    dew_point: number
    dt: number
    feels_like: {
        day: number
        eve: number
        morn: number
        night: number
    }
    humidity: number
    icon: string
    moon_phase: number
    moonrise: number
    moonset: number
    pop: number
    pressure: number
    rain: number
    summary: string
    sunrise: number
    sunset: number
    temp: {
        day: number
        eve: number
        max: number
        min: number
        morn: number
        night: number
    }
    uvi: number
    weather: {
        description: string
        icon: string
    }
    winds: {
        deg: number
        gust: number
        speed: number
    }
}