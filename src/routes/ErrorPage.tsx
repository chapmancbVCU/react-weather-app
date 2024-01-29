/**
 * @file Contains functions related to rendering the current conditions.
 * @author Chad Chapman
 */
import "../css/error.css";
import { useRouteError } from "react-router-dom";
import AppLayout from "../components/AppLayout";

/**
 * Renders error page for weather application
 * @returns JSX.Element for the error page.
 */
export default function ErrorPage(): JSX.Element {
  const error: any = useRouteError();
  console.error(error);

  return (

    <>
        <AppLayout />
        <div className="error-message-container">
            <h1>Oops!</h1>
            <p className="error-message">Sorry, an unexpected error has occurred.</p>
            <p className="error-message">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    </>
  );
}