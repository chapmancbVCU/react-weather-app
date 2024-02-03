/**
 * @file Supports ability to switch between metric and imperial units.
 * @author Chad Chapman
 */
import { FC, useEffect, useState } from "react";
import "../css/unitsToggleSwitch.css"
import { Weather } from "../ts/Weather";

interface UnitsToggleSwitchProps {
    weather: Weather
}

const UnitToggleSwitch : 
    FC<UnitsToggleSwitchProps> = ({ weather }): JSX.Element => {

    /**
     * @prop Free tier data to display current conditions.
     */
    const [freeTierData, setFreeTierData] = useState<any>();

    /**
     * Sets state for free tier data.
     */
    const setFreeTierWeatherData = async () => {
        const data = await weather.getJSONCityData();
        setFreeTierData(data);
    }

    useEffect(() => {
        setFreeTierWeatherData();
    }, []);
    
    return (
        <div className="toggle-switch-container">
            <div>{freeTierData && freeTierData.sys.country}</div>
            <label>
                <input />
                <span />
            </label>
        </div>
        
    );
        
    
};


export default UnitToggleSwitch;