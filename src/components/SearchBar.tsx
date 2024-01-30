/**
 * @file Supports ability to search for weather.
 * @author Chad Chapman
 */
import { ChangeEvent, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import '../css/searchbar.css';


/**
 * Responsible for rendering search bar, handling suggestions, and search 
 * operations.
 * @returns JSX.Element that contains the search bar.
 */
function SearchBar(): JSX.Element {

    const [options, setOptions] = useState<[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    
    const getSearchOptions = (value: string) => {
        fetch(`http://${import.meta.env.VITE_API_HOSTNAME}:3000/api?type=SEARCH_TERM&&searchTerm=${value.trim()}`)
            .then((response) => response.json())
            .then(res => {
                if (res.data) {
                    setOptions(res.data);
                }
            })
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Return if empty.
        if (value === '') return;
        getSearchOptions(value);
        console.log(options)
    }

    // const onOptionSelect = (option) => {

    // }
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
                    {options.map((option: { name: string, state: string}, index: number) => (
                        <li key={option.name + '-' + index}>
                            {/* <button> */}
                                {option.name}, {option.state}
                            {/* </button> */}
                        </li>
                    ))}
                </ul>
            </Form>
        </div>
    )
}

export default SearchBar;