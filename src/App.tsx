import React from 'react';
import Navbar from "./_components/Navbar";
import {BrowserRouter } from "react-router-dom";
import Router from "./_navigation/Router";
import Input from "./_components/Form/Input";

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
