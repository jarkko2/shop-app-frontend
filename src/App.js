import React from 'react';
import './App.css';
import { Outlet} from "react-router-dom";

import OnlineCheck from './OnlineCheck';
import NavigationBar from './NavigationBar';


function App() {
    return (
        <div className="App">
            <OnlineCheck/>
            <NavigationBar/>
            <Outlet />
        </div>

    );
}

export default App;
