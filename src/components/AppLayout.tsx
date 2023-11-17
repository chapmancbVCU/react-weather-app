/**
 * @file Sets general layout for the application.
 * @author Chad Chapman
 */
import Navbar from "./Navbar"
import { Outlet, } from 'react-router-dom';

/**
 * Renders the Navbar and Outlet components.
 * @returns React.Fragment that contains general layout for the page.
 */
export const AppLayout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    )
  }