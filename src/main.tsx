/**
 * @file Main entry point of the React Weather App application. It also 
 * contains the routing.
 * @author Chad Chapman 
 */
import AppLayout  from './components/AppLayout';
import Daily from './routes/Daily';
import { DateTimeUtility } from './ts/DateTimeUtility.ts'; 
import ErrorPage from './routes/ErrorPage.tsx';
import Home from './routes/Home';
import Hourly from './routes/Hourly';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
    createBrowserRouter, 
    RouterProvider
} from 'react-router-dom';
import './css/styles.css';
import { Weather } from './ts/Weather.ts';


// Instantiate objects here so they are available across application.
const weather = new Weather();

/*
 Perform initial query of current location upon start of application.  Then 
 get weather data for that initial query.
 */
try {
    const localityInfo = await weather.getCityInfo();
    const cityData = await weather.getCityData(localityInfo);
    const countryName = await weather.getCountryName();
    weather.setUnits(countryName);

    weather.setJSONCityData(cityData);

    // const descriptiveWeatherData = 
    //   await weather.getOneCallWeatherData(weather.getLatitude(), weather.getLongitude());
    // weather.setJSONDescriptiveWeatherData(descriptiveWeatherData);
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
                element: <Home weather={weather}
                />,
            },
                {
                path: "/react-weather-app/daily",
                element: <Daily weather={weather}
                />,
            },
            {
                path: "/react-weather-app/hourly",
                element: <Hourly weather={weather}
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
