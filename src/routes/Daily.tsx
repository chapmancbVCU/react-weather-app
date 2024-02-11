/**
 * @file Contains functions related to rendering the daily forecast.
 * @author Chad Chapman
 */
import '../css/currentConditionsBackground.css';
import { DateTimeUtility } from '../classes/DateTimeUtility.ts';
import { ChangeEvent, FC, useEffect, useState} from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import { optionType } from '../types/Option.ts';
import SearchBar  from '../components/SearchBar.tsx';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import useSetBackground from '../hooks/useSetBackground.ts';
import useUnitsToggle from '../hooks/useUnitsToggle.ts';
import { Weather } from "../classes/Weather.ts";

/**
 * @interface HomePageProps The interface that describes props
 * that are shared between components.
 */
interface DailyPageProps {
    weather: Weather;
}

/**
 * Renders the daily forecast component.
 * @returns JSX.Element that contains the daily forecast component.
 */
// @ts-ignore
const Daily : FC<DailyPageProps> = ({ dateTimeUtility, weather }): JSX.Element => {
    /**
     * @prop Name of city for current or remote location we are getting the 
     * weather forecast.
     */
    const [city, setCity] = useState<any>();

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

    const [selectedCity, setSelectedCity] = useState<optionType | null>(null);

    const getForecast = async (selectedCity: optionType) => {
        console.log("Search Data");
        const freeTier =  await weather.getCityData(`${selectedCity.name},${selectedCity.state}`);
        setCity(`${selectedCity.name},${selectedCity.state}`);
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
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Return if empty.
        if (value === '') return;
        getSearchOptions(value);
        console.log(options)
    }

    const onOptionSelect = async (option: optionType) => {
        setSelectedCity(option);
        console.log(option.name);
    }

    const onSubmit = () => {
        if(!selectedCity) return;
        getForecast(selectedCity);
    }
    
    /**
     * @prop Used to set background of app based on current conditions based 
     * on free tier data.
     */
    const { conditionsClassName } =  useSetBackground(freeTierData, weather);

    /**
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);

    useEffect(() => {
        if(selectedCity) {
            setSearchTerm(selectedCity.name);
            setCity(`${selectedCity.name},${selectedCity.state}`);
            setOptions([]);
        } 

        setFreeTierData(weather.getJSONFreeTierData());
        setOneCallData(weather.getJSONOneCallWeatherData());
        console.log("Free tier data (ctrl+s if no output on page load):");
        console.log(freeTierData);
        console.log("One call data");
        console.log(oneCallData);
    }, [weather, toggled, freeTierData]);

    return (
        <div className={conditionsClassName}>
            <div className='forecast'>
                <ForecastHeader>
                <SearchBar searchTerm={searchTerm}
                        options={options}
                        onInputChange={onInputChange}
                        onOptionSelect={onOptionSelect}
                        onSubmit={onSubmit}  />
                    <UnitToggleSwitch weather={weather} rounded={true} isToggled={toggled} handleToggleChange={handleToggleChange}/>
                    <h2 className='page-title'>Your 7 Day Forecast</h2>
                    <h3>Free Tier Data</h3>
                    <p>clouds: {freeTierData && freeTierData.clouds.all}</p>
                    <p>{typeof oneCallData && oneCallData?.current.clouds}</p>
                </ForecastHeader>
            </div>
        </div>
    )
};

export default Daily;