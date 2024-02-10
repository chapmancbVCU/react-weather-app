/**
 * @file Describes functions related to units toggle switch props.
 * @author Chad Chapman
 */
import { useEffect, useState } from "react";
import { Weather } from "../classes/Weather";

const useUnitsToggle = (weather: Weather) => {
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
     * Sets value for variable "toggled" depending on what units is being used 
     * by the Weather class instance.
     */
    const setToggleCheckedState = (): void => {
        if (weather.getUnits() === "IMPERIAL") setIsToggled(false);
        else if (weather.getUnits() === "METRIC") setIsToggled(true);
    }

    useEffect(() => {
        setToggleCheckedState();
    }, [toggled, handleToggleChange])

    return {
        toggled,
        handleToggleChange
    }
}




export default useUnitsToggle;