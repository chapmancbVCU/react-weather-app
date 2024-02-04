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

    // value of input
    const [isToggled, setIsToggled] = useState<boolean>(false);

    /**
     * Sets state for free tier data.
     */
    const setFreeTierWeatherData = async () => {
        const data = await weather.getJSONCityData();
        setFreeTierData(data);
    }

    /**
     * 
     */
    const sliderCX = cx('slider', {
        'rounded': rounded
    });
    const [unitsLabel, setUnitsLabel] = useState("");

    const handleToggleChange = (e: any) => {
        console.log(e.target.checked)
        weather.toggleUnits();
        setWeatherUnits()
    }
    
    const setWeatherUnits = () => {
        const weatherUnits = weather.getUnits();
        console.log(weatherUnits)
        let weatherUnitsLabel;
        if(weatherUnits === "IMPERIAL") {
            weatherUnitsLabel = "F";
            setIsToggled(false);
        } else {
            weatherUnitsLabel = "C";
            setIsToggled(true);
        }
        setUnitsLabel(weatherUnitsLabel);
    }

    useEffect(() => {
        setFreeTierWeatherData();
        setWeatherUnits();
        console.log(isToggled)
    }, []);

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