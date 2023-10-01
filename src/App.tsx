import React from 'react';
import Navbar from "./components/Navbar";
import {BrowserRouter } from "react-router-dom";
import Router from "./navigation/Router";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <Router/>
            </div>
        </BrowserRouter>
    );
}

export default App;
