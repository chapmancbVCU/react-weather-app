/**
 * @file Contains functions related to rendering the current conditions.
 * @author Chad Chapman
 */
import { useRouteError } from "react-router-dom";


/**
 * Renders error page for weather application
 * @returns JSX.Element for the error page.
 */
export default function ErrorPage(): JSX.Element {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}