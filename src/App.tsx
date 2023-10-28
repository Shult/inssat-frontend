import React from 'react';
import {BrowserRouter } from "react-router-dom";
import Router from "./_navigation/Router";
import NavAside from "./_components/Navbars/NavAside";
import "./App.css"

function App() {

    return (
        <BrowserRouter>
            <div className="App line">
                <NavAside/>
                <div id={"AppContainer"}>
                    <Router/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
