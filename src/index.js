import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./routes/login";
import ShopView from './routes/shopView';
import OrderView from './routes/orderView';
import Cart from './routes/cart';
import RegisterRoute from './routes/register';
import OrderHistoryView from './routes/orderhistory';

import App from './App';
import reportWebVitals from './reportWebVitals';

// Reducer
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import { authenticationReducer } from './Reducer';

export const store = configureStore({reducer: authenticationReducer})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="login" element={<Login />} />
              <Route path="shopView" element={<ShopView />} />
              <Route path="orderView" element={<OrderView />} />
              <Route path="cart" element={<Cart/>} />
              <Route path="register" element={<RegisterRoute/>} />
              <Route path="orderhistory" element={<OrderHistoryView/>} />
            </Route>
          </Routes>
        </BrowserRouter>,
      </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
