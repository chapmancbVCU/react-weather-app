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


const UnitToggleSwitch : FC<UnitsToggleSwitchProps> = ({ 
        weather, 
        rounded = false, 
        isToggled, 
        handleToggleChange
    }): JSX.Element => {

    /**
     * @prop Free tier data to display current conditions.
     */
    const [freeTierData, setFreeTierData] = useState<any>(); 

    /**
     * Slider property.
     */
    const sliderCX: string = cx('slider', { 'rounded': rounded });

    /**
     * @prop Label for unit of temperature measure (Ex: C or F).
     */
    const [unitsLabel, setUnitsLabel] = useState<string>("");
   
    /**
     * Sets state for free tier data.
     */
    const setFreeTierWeatherData = (): void => {
        setFreeTierData(weather.getJSONCityData());
    }

    /**
     * Set the value for the units label prop to C or F.
     */
    const updateUnitsLabel = (): void => {
        if (weather.getUnits() === "IMPERIAL") setUnitsLabel("F");
        else if (weather.getUnits() === "METRIC" ) setUnitsLabel("C");
    }

    useEffect(() => {
        setFreeTierWeatherData();
        updateUnitsLabel();
        console.log(weather.getUnits())
    }, [weather, isToggled]);

    return (
        <div className="toggle-switch-container">
            <h3>
                {freeTierData && freeTierData.sys.country} | 
                {'\xB0'}{typeof unitsLabel === 'string' ? unitsLabel : null}
            </h3>
            <label className="toggle-switch">
                <input type="checkbox" 
                    name='isToggled' 
                    id='isToggled' 
                    checked={isToggled} 
                    onChange={handleToggleChange}/>
                <span className={sliderCX} />
            </label>
            <h3>Select Units</h3>
        </div>
        
    );
        
    
};


export default UnitToggleSwitch;