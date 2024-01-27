/**
 * @file Main entry point of the React Weather App application. It also 
 * contains the routing.
 * @author Chad Chapman 
 */
import AppLayout  from './components/AppLayout';
import Daily from './routes/Daily';
import { DateTimeUtility } from './ts/DateTimeUtility.ts'; 
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

const dateTimeUtility = new DateTimeUtility();
const weather = new Weather();

try {
  const localityInfo = await weather.getCityInfo();
  console.log(localityInfo);
  const cityData = await weather.getCityData(localityInfo, "localhost");
  console.log(cityData)
  const countryName = await weather.getInitialCountryName();
  weather.setUnits(countryName);

  weather.setJSONCityData(cityData);

  const descriptiveWeatherData = 
    await weather.getWeatherData(weather.getLatitude(), weather.getLongitude(), "localhost");
  weather.setJSONDescriptiveWeatherData(descriptiveWeatherData);
  console.log(descriptiveWeatherData);


} catch (error) {
  console.log(error)
}

/**
 * This function is responsible for routing within this application.
 */
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/react-weather-app/",
        element: <Home weather={weather}
          dateTimeUtility={dateTimeUtility}/>,
      },
      {
        path: "/react-weather-app/daily",
        element: <Daily weather={weather}/>,
      },
      {
        path: "/react-weather-app/hourly",
        element: <Hourly weather={weather}/>,
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
