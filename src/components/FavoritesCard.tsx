/**
 * @file Card containing simple information for a favorite location.
 * @author Chad Chapman
 */

import { FC, useEffect, useState } from "react";
import { Favorite } from "../classes/Favorite";
import '../css/quickFavorites.css';
import { Weather } from "../classes/Weather";
import useUnitsToggle from "../hooks/useUnitsToggle";
interface FavoritesCardProps {
    favorite: Favorite;
    weather: Weather;
}
const FavoritesCard : FC<FavoritesCardProps> = ({favorite, weather}): JSX.Element => {

    const [city, setCity] = useState<string>("");

    const [freeTierData, setFreeTierData] = useState<any>();

    const [temperature, setTemperature] = useState<number>();
    const freeTier = async () => {
        try {
            const response = await fetch(
                `http://${import.meta.env.VITE_API_HOSTNAME}:3000/api?type=SIMPLE&city=${city}`);
            const res = await response.json()
            if (res.data && res.data.cod != "400") { 
                setFreeTierData(res.data) 
            }
        } catch (error) { console.log(error); }
    }

    /**
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);
    
    useEffect(() => {
        setCity(favorite.getCity());
    }, []);

    useEffect(() => {
        freeTier();  
    }, [city]);

    useEffect(() => {
        console.log("Favorites ------------------------")
        console.log(freeTierData);
        setTemperature(weather.calculateTemperature(freeTierData?.main?.temp));
    }, [toggled, freeTierData]);

    return (
        <div className="favorites-card">
            <div>{city}</div>
            <div>
                {temperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}
            </div>
        </div>
    )
}

export default FavoritesCard;