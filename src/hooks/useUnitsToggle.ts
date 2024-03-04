/**
 * @file Describes functions related to units toggle switch props.
 * @author Chad Chapman
 */
import { useEffect, useState } from "react";
import { Weather } from "../classes/Weather";
import { Favorite } from "../classes/Favorite";

const useUnitsToggle = (weather: Weather, favorites: Favorite[], freeTierData: any) => {

    const [isFavorite, setIsFavorite] = useState<boolean>();
    /**
     * @prop Label for unit of temperature measure (Ex: C or F).
     */
    const [temperatureUnitsLabel, setTemperatureUnitsLabel] = useState<string>("");

    /**
     * @prop Property for checkbox depending on whether or not it is
     * checked.
     */
    const [toggled, setIsToggled] = useState<boolean>(false);

    const handleFavoriteToggleChange = (): void => {
        setIsFavorite(!isFavorite);
    }

    /**
     * This function is called when state of units toggle switch is updated.
     */
    const handleToggleChange = (): void => {
        weather.toggleUnits();
        setToggleCheckedState();
    }

    const handleFavoriteOnInit = (): void => {
        console.log("testing");
        console.log(freeTierData)
        setIsFavorite(false);
        for (let i: number = 0; i < favorites?.length; i++) {
            console.log(favorites[i].getCity());
            console.log(freeTierData?.name)
            if(favorites[i].getCity() === freeTierData?.name) {
               setIsFavorite(true);
               break;
            }
        }
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
        handleFavoriteOnInit();
    }, [freeTierData, weather])
    useEffect(() => {
        setToggleCheckedState();
        updateTemperatureUnitsLabel();
    }, [toggled, handleToggleChange])

    useEffect(() => {
        console.log("favorite toggle" + isFavorite);
    }, [isFavorite])

    return {
        handleFavoriteToggleChange,
        handleToggleChange,
        isFavorite,
        temperatureUnitsLabel,
        toggled
    }
}

export default useUnitsToggle;