import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain = 'dev--vwkd5zi.eu.auth0.com'
    clientId ='VFJ9KS3yw7XRmKThdQpomsddUrhe5Bed'
    // domain = {process.env.REACT_APP_DOMAIN}
    // clientId = {process.env.REACT_APP_CLIENTID}
    redirectUri = {window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
