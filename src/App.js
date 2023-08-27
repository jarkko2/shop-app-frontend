import React from 'react';
import './App.css';
import Cart from './Cart';
import { Outlet, Link, useNavigate } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <nav>
                <div className="navBar">
                    <div className="navBarLeft">
                        <Cart />
                    </div>
                    <div className="navBarRight">
                        <Link to="/login">Login</Link> |
                        <Link to="/shopView"> ShopView</Link> |
                        <Link to="/orderView"> OrderView</Link>
                    </div>
                </div>
            </nav>
            <Outlet />
            <header className="App-header"></header>
        </div>
    );
}

export default App;
