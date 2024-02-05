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
    isToggled: boolean
    handleToggleChange: any
}


const UnitToggleSwitch : 
    FC<UnitsToggleSwitchProps> = ({ weather, rounded = false, isToggled, handleToggleChange }): JSX.Element => {

    /**
     * @prop Free tier data to display current conditions.
     */
    const [freeTierData, setFreeTierData] = useState<any>();

    /**
     * Sets state for free tier data.
     */
    const setFreeTierWeatherData = (): void => {
        setFreeTierData(weather.getJSONCityData());
    }

    /**
     * 
     */
    const sliderCX = cx('slider', {
        'rounded': rounded
    });

    /**
     * @prop Label for unit of temperature measure (Ex: C or F).
     */
    const [unitsLabel, setUnitsLabel] = useState<string>("");
   
    /**
     * Set the value for the units label prop to C or F.
     * @returns when nothing else to do.
     */
    const updateUnitsLabel = (): void => {
        if (weather.getUnits() === "IMPERIAL") setUnitsLabel("F");
        else if (weather.getUnits() === "METRIC" ) setUnitsLabel("C");
        else return;
    }

    useEffect(() => {
        setFreeTierWeatherData();
        updateUnitsLabel();
        console.log(weather.getUnits())
    }, [weather, isToggled]);

    return (
        <div className="toggle-switch-container">
            <div>
                {freeTierData && freeTierData.sys.country} | {'\xB0'}{typeof unitsLabel === 'string' ? unitsLabel : null}
            </div>
            <label className="toggle-switch">
                <input type="checkbox" name='isToggled' id='isToggled' checked={isToggled} onChange={handleToggleChange}/>
                <span className={sliderCX} />
            </label>
            <div>Select Units</div>
        </div>
        
    );
        
    
};


export default UnitToggleSwitch;