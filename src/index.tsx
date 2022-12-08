import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { Wrapper } from "@googlemaps/react-wrapper";
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from './store'
// Config
import config from "./config";
import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Wrapper apiKey={config.GOOGLE_API_KEY}>
      <App />
    </Wrapper>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
