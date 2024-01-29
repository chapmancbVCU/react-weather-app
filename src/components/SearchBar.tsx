/**
 * @file Supports ability to search for weather.
 * @author Chad Chapman
 */
import { ChangeEvent, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import '../css/searchbar.css';


/**
 * 
 * @returns 
 */
function SearchBar(): JSX.Element {

    const [options, setOptions] = useState<[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    
    const getSearchOptions = (value: string) => {
        fetch(`http://localhost:3000/api?type=SEARCH_TERM&&searchTerm=${value.trim()}`)
            .then((res) => res.json())
            .then((data) => setOptions(data));
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Return if empty.
        if (value === '') return;
        getSearchOptions(value);
        console.log(options)
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
                <div className="sr-only" aria-live="polite">
                {/* {options.map((option: {name: string}) => (
                    <p>{option.name}</p>
                ))} */}
                
                </div>
            </Form>
        </div>
    )
}

export default SearchBar;