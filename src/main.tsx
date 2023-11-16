import Daily from './components/Daily';
import Home from './components/Home';
import Hourly from './components/Hourly';
import Nav from './components/Nav';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';


import './css/styles.css';
const router = createBrowserRouter([
  {
    element: <Nav />,
    children: [
      {
        path: "/react-weather-app/",
        element: <Home />,
      },
      {
        path: "/react-weather-app/daily",
        element: <Daily />,
      },
      {
        path: "/react-weather-app/hourly",
        element: <Hourly />,
      }
    ]
    
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
