/**
 * @file Contains functions related to rendering the hourly forecast.
 * @author Chad Chapman
 */
import { DateTimeUtility } from '../ts/DateTimeUtility';
import { FC, useEffect, useState } from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import { Weather } from "../ts/Weather";


/**
 * @interface HourlyPageProps The interface that describes props
 * that are shared between components.
 */
interface HourlyPageProps {
    weather: Weather;
}


/**
 * Renders the hourly forecast component.
 * @returns JSX.Element that contains the hourly forecast component.
 */
// @ts-ignore
const Hourly : FC<HourlyPageProps> =({ weather }): JSX.Element => {
    /**
     * @prop Used to set background of app based on current conditions based 
     * on free tier data.
     */
    const [conditionsClassName, setConditionsClassName] = useState<string>("");

    /**
     * @prop Free tier data to display current conditions.
     */
    const [freeTierData, setFreeTierData] = useState<any>();

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
     * Sets className for background image based on current conditions.
     */
    const setConditionsClass = async (): Promise<void> => {
        const currentConditions: string = await freeTierData?.weather[0].description;
        setConditionsClassName(weather.setConditionsClass(currentConditions));
    }

    /**
     * Sets value for variable toggled depending on what units is being used 
     * by the Weather class instance.
     */
    const setToggleCheckedState = (): void => {
        if (weather.getUnits() === "IMPERIAL") setIsToggled(false);
        else if (weather.getUnits() === "METRIC") setIsToggled(true); 
    }

    useEffect(() => {
        setFreeTierData(weather.getJSONFreeTierData());
        setOneCallData(weather.getJSONOneCallWeatherData());
        setToggleCheckedState();
        setConditionsClass();

        console.log("Free tier data (ctrl+s if no output on page load):");
        console.log(freeTierData);
        console.log("One call data");
        console.log(oneCallData);
    }, [weather, toggled, freeTierData]);


    return (
        <div className={conditionsClassName}>
            <div className='forecast'>
                <ForecastHeader>
                    <UnitToggleSwitch weather={weather} rounded={true} isToggled={toggled} handleToggleChange={handleToggleChange}/>
                    <h2 className='page-title'>Hourly Forecast</h2>
                    <h3>Free Tier Data</h3>
                    <p>clouds: {freeTierData && freeTierData.clouds.all}</p>
                    <p>{typeof oneCallData && oneCallData?.current.clouds}</p>
                </ForecastHeader>
            </div>
        </div>
    )
};

export default Hourly;