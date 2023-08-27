import React from 'react';
import './App.css';
import Cart from './Cart';
import { Outlet, Link, useNavigate } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
    return (
        <div className="App">
            <nav>
                <div className="navBar">
                    <div className="navBarLeft">
                        <Link to="/login">Login</Link> |
                        <Link to="/shopView"> ShopView</Link> |
                        <Link to="/orderView"> OrderView</Link>
                    </div>
                    <div className="navBarRight">
                        <Cart />
                    </div>
                </div>
            </nav>
            <Outlet />
            <header className="App-header"></header>
        </div>
    );
}

export default App;
