/**
 * @file Main entry point of the React Weather App application. It also 
 * contains the routing.
 * @author Chad Chapman 
 */
import AppLayout  from './components/AppLayout';
import Daily from './routes/Daily';
import { DateTimeUtility } from './classes/DateTimeUtility.ts'; 
import ErrorPage from './routes/ErrorPage.tsx';
import Favorites from './routes/Favorites.tsx';
import Home from './routes/Home';
import Hourly from './routes/Hourly';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
    createBrowserRouter, 
    RouterProvider
} from 'react-router-dom';
import './css/styles.css';
import { Weather } from './classes/Weather.ts';
import { Favorite } from './classes/Favorite.ts';


// Instantiate objects here so they are available across application.
const weather = new Weather();
const dateTimeUtility = new DateTimeUtility();

const favorites: Favorite[] = [];
favorites.push(new Favorite("Newport News, Virginia", "US", 36.9788, -76.428, 5));
favorites.push(new Favorite("Marion, Virginia", "US", 39.76844, -86.1555, 3));
favorites.push(new Favorite("London, England", "GB", 51.5085, -0.1257, 2));

/*
 Perform initial query of current location upon start of application.  Then 
 get weather data for that initial query.
 */
try {
    const localityInfo = await weather.getCityInfo();
    const cityData = await weather.getCityData(localityInfo);
    const countryName = await weather.getCountryName();
    weather.setUnits(countryName);

    weather.setJSONFreeTierData(cityData);
} catch (error) {
    console.log(error)
}

/*
 Second try catch block to resolve issue of getting one call data on app start.
 */
try {
    const descriptiveWeatherData = 
      await weather.getOneCallWeatherData(weather.getLatitude(), weather.getLongitude());
    weather.setJSONOneCallWeatherData(descriptiveWeatherData);
} catch (error) {
    console.log(error)
}

/**
 * This function is responsible for routing within this application.
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/react-weather-app/",
                element: <Home dateTimeUtility={dateTimeUtility}
                    favorites={favorites}
                    weather={weather}
                />,
            },
                {
                path: "/react-weather-app/daily",
                element: <Daily  dateTimeUtility={dateTimeUtility}
                    favorites={favorites}
                    weather={weather}
                />,
            },
            {
                path: "/react-weather-app/hourly",
                element: <Hourly  dateTimeUtility={dateTimeUtility}
                    favorites={favorites}
                    weather={weather}
                />,
            },
            {
                path: "/react-weather-app/favorites",
                element: <Favorites weather={weather}
                />,
            },
        ],
    },
]);


/*
 * Main entry point for the application.  Routing for the application occurs 
 * here.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
