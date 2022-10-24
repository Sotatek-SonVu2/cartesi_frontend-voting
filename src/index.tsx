import { TourProvider } from '@reactour/tour';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom/client';
import { ReactNotifications } from 'react-notifications-component';
import "react-notifications-component/dist/theme.css";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { tourSteps } from './utils/tourSteps';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <TourProvider steps={tourSteps} scrollSmooth>
      <BrowserRouter>
        <ReactNotifications />
        <App />
      </BrowserRouter>
    </TourProvider>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
