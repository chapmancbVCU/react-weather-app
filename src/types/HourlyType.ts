/**
 * @file Defines complete hourly forecast card.
 * @author Chad Chapman
 */

export type HourlyType = {
    clouds: string
    dew_point: number
    dt: number
    feels_like: number
    humidity: number
    pop: number
    pressure: number
    temp: number
    uvi: number
    visibility: number
    weather: {
        description: string
        icon: string
    }
    wind_deg: number
    wind_gust: number
    wind_speed: number
}