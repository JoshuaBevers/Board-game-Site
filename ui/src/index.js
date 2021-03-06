import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from '@auth0/auth0-react';
ReactDOM.render(
  <Auth0Provider
    domain='dev-zrtci-fg.us.auth0.com'
    clientId='sqQpCbJiICBOxE6FwxwaH4xXw8w25jO9'
    redirectUri={window.location.origin}
    audience='https://dev-zrtci-fg.us.auth0.com/api/v2/'
    scope='read:current_user update:current_user_metadata'
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
