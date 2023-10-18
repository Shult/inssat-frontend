import React from 'react';
import Navbar from "./_components/Navbar";
import {BrowserRouter } from "react-router-dom";
import Router from "./_navigation/Router";
import Calendar from "./_components/Calendar";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <Router/>
                <Calendar/>
            </div>
        </BrowserRouter>
    );
}

export default App;
