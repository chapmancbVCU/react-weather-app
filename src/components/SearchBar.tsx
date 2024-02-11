/**
 * @file Supports ability to search for weather.
 * @author Chad Chapman
 */
import { ChangeEvent, FC } from 'react';
import { Form } from 'react-router-dom';
import { optionType } from '../types/Option';
import '../css/searchbar.css';

interface SearchBarProps {
    searchTerm: string
    options: []
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onOptionSelect: (option: optionType) => void
    onSubmit: () => void
}

/**
 * Responsible for rendering search bar, handling suggestions, and search 
 * operations.
 * @returns JSX.Element that contains the search bar.
 */
const SearchBar : FC<SearchBarProps> = ({
        searchTerm, 
        options, 
        onInputChange, 
        onOptionSelect, 
        onSubmit
    }): JSX.Element => {

    return (
        <>
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
                </Form>
                <button className='search-button'onClick={onSubmit}>Search</button>
            </div>
            <ul className='options-list'>
                {options.map((option: optionType, index: number) => (
                    <li className="options-list-item" key={option.name + '-' + index}>
                        <button onClick={() => onOptionSelect(option)}>
                            {option.name}, {option.state}, {option.country}
                        </button>
                    </li>
                ))}
            </ul>
        </> 
    )
}

export default SearchBar;