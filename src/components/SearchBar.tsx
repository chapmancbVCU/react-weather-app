import { Form, useLoaderData } from 'react-router-dom';
import '../css/searchbar.css';

function SearchBar() {

    const q = useLoaderData();
    
    return (
        <div className="search-bar">
            <Form className="search-form">
                <input id="q"
                    type="search"
                    name="q"
                    aria-label="Get weather conditions"
                    placeholder="City or Zip Code">
                </input>
                <div 
                    id="search-spinner"
                    aria-hidden
                    hidden={true}
                />
                <div className="sr-only" aria-live="polite">

                </div>
            </Form>
        </div>
    )
}

export default SearchBar;