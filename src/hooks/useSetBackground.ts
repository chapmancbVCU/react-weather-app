/**
 * @file Describes functions related hook used to set background based on 
 * current weather conditions.
 * @author Chad Chapman
 */

import { useEffect, useState } from "react";
import { Weather } from "../classes/Weather";

const useSetBackground = (freeTierData:any, weather: Weather) => {
    /**
     * @prop Used to set background of app based on current conditions based 
     * on free tier data.
     */
    const [conditionsClassName, setConditionsClassName] = useState<string>("");

    /**
     * Sets className for background image based on current conditions.
     */
    const setConditionsClass = async (): Promise<void> => {
        const currentConditions: string = await freeTierData?.weather[0].description;
        setConditionsClassName(weather.setConditionsClass(currentConditions));
    }

    useEffect(() => {
        setConditionsClass();
    }, [freeTierData, weather])

    return {
        conditionsClassName
    }
}

export default useSetBackground;