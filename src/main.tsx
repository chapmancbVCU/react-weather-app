/**
 * @file Main entry point of the React Weather App application. It also 
 * contains the routing.
 * @author Chad Chapman 
 */
import AppLayout  from './components/AppLayout';
import Daily from './routes/Daily';
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


const weather = new Weather();


/**
 * This function is responsible for routing within this application.
 */
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/react-weather-app/",
        element: <Home weather={weather}/>,
      },
      {
        path: "/react-weather-app/daily",
        element: <Daily />,
      },
      {
        path: "/react-weather-app/hourly",
        element: <Hourly />,
      },
    ],
  },
]);


/**
 * Main entry point for the application.  Routing for the application occurs 
 * here.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
