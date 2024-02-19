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


// Instantiate objects here so they are available across application.
const weather = new Weather();
const dateTimeUtility = new DateTimeUtility();

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

    const descriptiveWeatherData = 
      await weather.getOneCallWeatherData(weather.getLatitude(), weather.getLongitude());
    weather.setJSONOneCallWeatherData(descriptiveWeatherData);
    setTimeout('', 5000);
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
                    weather={weather}
                />,
            },
                {
                path: "/react-weather-app/daily",
                element: <Daily  dateTimeUtility={dateTimeUtility}
                    weather={weather}
                />,
            },
            {
                path: "/react-weather-app/hourly",
                element: <Hourly  dateTimeUtility={dateTimeUtility}
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
