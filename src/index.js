import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import App from './App';
import 'shared/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
  // <PersistGate persistor={persistor}>
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
  //  </PersistGate>
  // </Provider>
);
