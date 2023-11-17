import Daily from './routes/Daily';
import Home from './routes/Home';
import Hourly from './routes/Hourly';
import Navbar from './components/Navbar';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  Outlet, 
  RouterProvider
} from 'react-router-dom';
import './css/styles.css';


const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}


const router = createBrowserRouter([
  {
    element: <AppLayout />,
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
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
