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
     * @prop Property for checkbox depending on whether or not it is
     * checked.
     */
    const [toggled, setIsToggled] = useState<boolean>(false);

    /**
     * This function is called when state of units toggle switch is updated.
     */
    const handleToggleChange = (): void => {
        weather.toggleUnits();
        setToggleCheckedState();
    }

    /**
     * Sets state for one call tier data.
     */
    const setOneCallWeatherData = async () => {
        const data = await weather.getJSONDescriptiveWeatherData();
        setOneCallData(data);
    }

    /**
     * Sets value for variable toggled depending on what units is being used 
     * by the Weather class instance.
     */
    const setToggleCheckedState = (): void => {
        if (weather.getUnits() === "IMPERIAL") {
            setIsToggled(false);
        } else if (weather.getUnits() === "METRIC"){
            setIsToggled(true);
        }
    }

    useEffect(() => {
        setOneCallWeatherData();
        setToggleCheckedState();
        console.log("One call data");
        console.log(oneCallData);
    }, [weather, toggled]);

    return (
        <div className='clear-sky content'>
            <div className='forecast'>
                <ForecastHeader>
                    <UnitToggleSwitch weather={weather} rounded={true} isToggled={toggled} handleToggleChange={handleToggleChange}/>
                    <p>{weather.getUnits()}</p>
                    <h2 className='page-title'>Your 7 Day Forecast</h2>
                    <p>{typeof oneCallData && oneCallData?.current.clouds}</p>
                </ForecastHeader>
            </div>
        </div>
    )
};

export default Daily;