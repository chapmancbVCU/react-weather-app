/**
 * @file Contains functions setting weather data and updating data after the 
 * user performs a search.
 * @author Chad Chapman
 */
import { ChangeEvent, useEffect, useState } from "react";
import { Weather } from "../classes/Weather";
import { optionType } from "../types/Option";

const useForecast = (weather: Weather) => {
    /**
     * @prop Name of city for current or remote location we are getting the 
     * weather forecast.
     */
    const [city, setCity] = useState<any>();

    /**
     * @prop Name of country where city is located.
     */
    const [country, setCountry] = useState(Object);

    /**
     * @prop Free tier data to display current conditions.
     */
    const [freeTierData, setFreeTierData] = useState<any>();

    /**
     * @prop One call tier data for displaying hourly and daily forecast.
     */
    const [oneCallData, setOneCallData] = useState<any>();

    /**
     * @prop The available location suggestions presented to the user.
     */
    const [options, setOptions] = useState<[]>([]);

    /**
     * @prop The search term that the user enters into the search bar.
     */
    const [searchTerm, setSearchTerm] = useState<string>('');

    /**
     * @prop The city the user selects from the dropdown suggestions.
     */
    const [selectedCity, setSelectedCity] = useState<optionType | null>(null);

    /**
     * Performs the fetch request to Open Weather Map after a user selects 
     * a location in the search field.
     * @param selectedCity The city whose forecast we want to retrieve.
     */
    const getForecast = async (selectedCity: optionType) => {
        console.log("Search Data");
        const freeTier =  await weather.getCityData(`${selectedCity.name},${selectedCity.state}`);
        console.log(city);
        weather.setJSONFreeTierData(freeTier);
        setFreeTierData(freeTier);
        console.log(freeTier)
        const oneCall =  await weather.getOneCallWeatherData(selectedCity.lat, selectedCity.lon);
        weather.setJSONOneCallWeatherData(oneCall);
        setOneCallData(oneCall);
        console.log(oneCall);
    }

    /**
     * Retrieves suggested names for locations when user types query into 
     * the search bar.
     * @param value Input for search bar.
     */
    const getSearchOptions = (value: string) => {
        fetch(`http://${import.meta.env.VITE_API_HOSTNAME}:3000/api?type=SEARCH_TERM&&searchTerm=${value.trim()}`)
        .then((response) => response.json())
        .then(res => {
            if (res.data) {
                setOptions(res.data);
            }
        })
    }

    /**
     * Detects input from search field and sets search term and search options 
     * that will be presented to the user.
     * @param e Event for when new input is detected in the search field.
     * @returns 
     */
    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Return if empty.
        if (value === '') return;
        getSearchOptions(value);
        console.log(options)
    }

    /**
     * Event handler that detects when the user selects a location in the 
     * options dropdown.
     * @param option The option the user selected.
     */
    const onOptionSelect = async (option: optionType): Promise<void> => {
        setSelectedCity(option);
        console.log(option.name);
    }

    /**
     * Listens for when user clicks submit on search button.
     */
    const onSubmit = (): void => {
        if(!selectedCity) return;
        getForecast(selectedCity);
    }

    /**
     * Sets state for current city.
     */
    const setCityName = async (): Promise<void> => {
        setCity(await weather.getCityInfo());
    }

    /**
     * Sets state for country for where current city is located.
     */
    const setCountryName = async (): Promise<void> => {
        setCountry(await weather.getCountryName());
    }

    useEffect(() => {
        if (selectedCity) {
            setSearchTerm(selectedCity.name);
            weather.setCity(`${selectedCity.name}, ${selectedCity.state}`);
            setCity(weather.getCityInfo());
            weather.setCountry(freeTierData.sys.country);
            weather.setLatitude(selectedCity.lat);
            weather.setLongitude(selectedCity.lon);
            setCountryName();
            setOptions([]);
        } else if (!selectedCity && weather.getInit() === true) {
            setCityName();
            setCountryName();
            weather.setInitFalse();
        } else {
            setCityName();
            setCountryName();
        }

        setFreeTierData(weather.getJSONFreeTierData());
        setOneCallData(weather.getJSONOneCallWeatherData());
        console.log(city + ", " + country);
        console.log("Free tier data (ctrl+s if no output on page load):");
        console.log(freeTierData);
        console.log("One call data");
        console.log(oneCallData);
    }, [freeTierData, oneCallData, weather]);

    return {
        weather,
        freeTierData,
        oneCallData,
        searchTerm,
        options,
        city,
        country,
        onInputChange,
        onOptionSelect,
        onSubmit
    }
}

export default useForecast;
