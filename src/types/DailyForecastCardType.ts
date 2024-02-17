/**
 * @file Defines simplified data for daily forecast card.
 * @author Chad Chapman
 */

export type DailyForecastType = {
    description: string
    dt: number
    icon: string
    max: number
    min: number
}