import Navbar from "./Navbar"
import { Outlet, } from 'react-router-dom';


export const AppLayout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    )
  }