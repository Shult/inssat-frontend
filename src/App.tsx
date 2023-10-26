import React from 'react';
import {BrowserRouter } from "react-router-dom";
import Router from "./_navigation/Router";
import NavAside from "./_components/Navbars/NavAside";

function App() {
    return (
        <BrowserRouter>
            <div className="App line">
                <NavAside/>
                <Router/>
            </div>
        </BrowserRouter>
    );
}

export default App;
