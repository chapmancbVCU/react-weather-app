/**
 * @file Contains functions related to rendering the daily forecast.
 * @author Chad Chapman
 */
import { DateTimeUtility } from '../ts/DateTimeUtility';
import '../css/currentConditions.css';
import { FC, useEffect, useState} from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import { Weather } from "../ts/Weather";


/**
 * @interface HomePageProps The interface that describes props
 * that are shared between components.
 */
interface DailyPageProps {
    weather: Weather;
}


/**
 * Renders the daily forecast component.
 * @returns JSX.Element that contains the daily forecast component.
 */
// @ts-ignore
const Daily : FC<DailyPageProps> = ({ dateTimeUtility, weather }): JSX.Element => {
    /**
     * @prop One call tier data for displaying hourly and daily forecast.
     */
    const [oneCallData, setOneCallData] = useState<any>();

    /**
     * Sets state for one call tier data.
     */
    const setOneCallWeatherData = async () => {
        const data = await weather.getJSONDescriptiveWeatherData();
        setOneCallData(data);
    }

    const handleToggleChange = (e: any) => {
        console.log('toggle state')
        weather.toggleUnits();
        console.log(weather.getUnits());
        if (weather.getUnits() === "IMPERIAL") {
            setIsToggled(false);
        } else {
            setIsToggled(true);
        }
        console.log(toggled)
    }

    const [toggled, setIsToggled] = useState<boolean>(false);

    const setWeatherUnits = () => {
       // console.log(weather.getUnits());
    }

    useEffect(() => {
        setOneCallWeatherData();
        setWeatherUnits;
    }, [weather, toggled]);

    return (
        <div className='clear-sky content'>
            <div className='forecast'>
                <ForecastHeader>
                    <UnitToggleSwitch weather={weather} rounded={true} isToggled={toggled} handleToggleChange={handleToggleChange}/>
                    <p>{weather.getUnits()}</p>
                    <h2 className='page-title'>Your 7 Day Forecast</h2>
                </ForecastHeader>
            </div>
            
            <p>{typeof oneCallData && oneCallData?.current.clouds}</p>
        </div>
    )
};

export default Daily;