/**
 * @file Supports ability to search for weather.
 * @author Chad Chapman
 */
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { optionType } from '../ts/Option';
import '../css/searchbar.css';
import { Weather } from '../ts/Weather';

interface SearchBarProps {
    weather: Weather
}

/**
 * Responsible for rendering search bar, handling suggestions, and search 
 * operations.
 * @returns JSX.Element that contains the search bar.
 */
const SearchBar: FC<SearchBarProps> = ({weather}): JSX.Element => {
    const [city, setCity] = useState<optionType | null>(null);

    /**
     * @prop The available location suggestions presented to the user.
     */
    const [options, setOptions] = useState<[]>([]);

    /**
     * @prop The search term that the user enters into the search bar.
     */
    const [searchTerm, setSearchTerm] = useState<string>('');
    
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
        setCity(option);
        console.log(option.name);
    }

    const getForecast = async (city: optionType) => {
        console.log("Search Data");
        const freeTier =  await weather.getCityData(`${city.name},${city.state}`);
        weather.setJSONFreeTierData(freeTier);
        console.log(freeTier)
        const oneCall =  await weather.getOneCallWeatherData(city.lat, city.lon);
        weather.setJSONOneCallWeatherData(oneCall);
        console.log(oneCall);
    }

    const onSubmit = () => {
        if(!city) return;
        getForecast(city);
    }

    useEffect(() => {
        if(city) {
            setSearchTerm(city.name);
            setOptions([]);
        }
    }, [city])


    return (
        <div className="search-bar">
            <Form className="search-form">
                <input id="q"
                    type="text"
                    aria-label="Get weather conditions"
                    placeholder="City or Zip Code"
                    value={searchTerm}
                    onChange={onInputChange}>
                </input>
                <div 
                    id="search-spinner"
                    aria-hidden
                    hidden={true}
                />
                <div className="sr-only" aria-live="polite"></div>
                <ul>
                    {options.map((option: optionType, index: number) => (
                        <li key={option.name + '-' + index}>
                            <button onClick={() => onOptionSelect(option)}>
                                {option.name}, {option.state}, {option.country}
                            </button>
                        </li>
                    ))}
                </ul>
                
            </Form>
            <button className='search-button'
                onClick={onSubmit}>Search</button>
        </div>
    )
}

export default SearchBar;