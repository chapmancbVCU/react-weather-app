/**
 * @file Supports ability to search for weather.
 * @author Chad Chapman
 */
import { ChangeEvent, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { optionType } from '../ts/Option';
import '../css/searchbar.css';


/**
 * Responsible for rendering search bar, handling suggestions, and search 
 * operations.
 * @returns JSX.Element that contains the search bar.
 */
function SearchBar(): JSX.Element {
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

    const onOptionSelect = (option: optionType) => {
        console.log(option.name);
    }

    return (
        <div className="search-bar">
            <Form className="search-form">
                <input id="q"
                    type="search"
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
                                {option.name}, {option.state}
                            </button>
                        </li>
                    ))}
                </ul>
            </Form>
        </div>
    )
}

export default SearchBar;