import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FirebaseProvider from './database/firebase';
import store from './store';
import { Provider } from 'react-redux'
import appTheme from './system/AppTheme';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, theme } from '@mui/material/styles'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseProvider>
        <ThemeProvider theme={appTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </FirebaseProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
