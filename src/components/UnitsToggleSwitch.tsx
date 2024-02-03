/**
 * @file Supports ability to switch between metric and imperial units.
 * @author Chad Chapman
 */
import cx from "classnames";
import { FC, useEffect, useState } from "react";
import "../css/unitsToggleSwitch.css"
import { Weather } from "../ts/Weather";


/**
 * @interface UnitsToggleSwitchProps The interface that manages props 
 * for the toggle switch.
 */
interface UnitsToggleSwitchProps {
    weather: Weather
    rounded: boolean
}


const UnitToggleSwitch : 
    FC<UnitsToggleSwitchProps> = ({ weather, rounded = false }): JSX.Element => {

    /**
     * @prop Free tier data to display current conditions.
     */
    const [freeTierData, setFreeTierData] = useState<any>();

    /**
     * 
     */
    const sliderCX = cx('slider', {
        'rounded': rounded
    });
    const [unitsLabel, setUnitsLabel] = useState("");

    /**
     * Sets state for free tier data.
     */
    const setFreeTierWeatherData = async () => {
        const data = await weather.getJSONCityData();
        setFreeTierData(data);
    }

    const setWeatherUnits = () => {
        const weatherUnits = weather.getUnits();
        let weatherUnitsLabel;
        if(weatherUnits === "IMPERIAL") {
            weatherUnitsLabel = "F";
        } else {
            weatherUnitsLabel = "C";
        }
        setUnitsLabel(weatherUnitsLabel);
    }

    useEffect(() => {
        setFreeTierWeatherData();
        setWeatherUnits();
    }, []);

    return (
        <div className="toggle-switch-container">
            <div>
                {freeTierData && freeTierData.sys.country} | {'\xB0'}{typeof unitsLabel === 'string' ? unitsLabel : null}
            </div>
            <label className="toggle-switch">
                <input type="checkbox"/>
                <span className={sliderCX}/>
            </label>
            <div>Select Units</div>
        </div>
        
    );
        
    
};


export default UnitToggleSwitch;