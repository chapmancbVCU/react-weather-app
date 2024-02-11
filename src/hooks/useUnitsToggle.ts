/**
 * @file Describes functions related to units toggle switch props.
 * @author Chad Chapman
 */
import { useEffect, useState } from "react";
import { Weather } from "../classes/Weather";

const useUnitsToggle = (weather: Weather) => {
       /**
     * @prop Label for unit of temperature measure (Ex: C or F).
     */
       const [temperatureUnitsLabel, setTemperatureUnitsLabel] = useState<string>("");

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
     * Set the value for the units label prop to C or F.
     */
    const updateTemperatureUnitsLabel = (): void => {
        if (weather.getUnits() === "IMPERIAL") setTemperatureUnitsLabel("F");
        else if (weather.getUnits() === "METRIC" ) setTemperatureUnitsLabel("C");
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
        updateTemperatureUnitsLabel();
    }, [toggled, handleToggleChange])

    return {
        handleToggleChange,
        temperatureUnitsLabel,
        toggled
    }
}

export default useUnitsToggle;