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

import App from './App';
import reportWebVitals from './reportWebVitals';

import { GlobalProvider } from './GlobalContext';
import ShoppingList from './Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<Login />} />
            <Route path="shopView" element={<ShopView />} />
            <Route path="orderView" element={<OrderView />} />
            <Route path="cart" element={<ShoppingList />} />
          </Route>
        </Routes>
      </BrowserRouter>,
    </React.StrictMode>
  </GlobalProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
