/**
 * @file Supports ability to switch between metric and imperial units.
 * @author Chad Chapman
 */
import cx from "classnames";
import { FC, useEffect, useState } from "react";
import "../css/unitsToggleSwitch.css"
import { Weather } from "../classes/Weather";


/**
 * @interface UnitsToggleSwitchProps The interface that manages props 
 * for the toggle switch.
 */
interface UnitsToggleSwitchProps {
    weather: Weather
    rounded: boolean
    isToggled: boolean
    handleToggleChange: any
    useUnitsToggle: any
}


const UnitToggleSwitch : FC<UnitsToggleSwitchProps> = ({ 
        weather, 
        rounded = false,  
        isToggled, 
        handleToggleChange,
        useUnitsToggle
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
     * Set toggle switch for units.
     */
    const { isFavorite, handleFavoriteToggleChange, temperatureUnitsLabel } = useUnitsToggle(weather);

    useEffect(() => {
        setFreeTierData(weather.getJSONFreeTierData());
        console.log(weather.getUnits())
    }, [weather, isToggled]);

    return (
        <div className="toggle-switch-container">
            <div className="toggle-switch-content">
                <h3>
                    {freeTierData && freeTierData.sys.country} | {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
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
            
            <form className="set-favorite-form">
                <input type="checkbox"
                    name="isFavorite"
                    checked={isFavorite}
                    onChange={handleFavoriteToggleChange}></input>
            </form>
        </div> 
    );
};

export default UnitToggleSwitch;