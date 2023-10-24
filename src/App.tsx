import React from 'react';
import {BrowserRouter } from "react-router-dom";
import Router from "./_navigation/Router";
//import Navbar from "./_components/Navbar";
import NavbarS from "./_components/NavbarS/NavbarS";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                {/*<Navbar/>*/}
                <NavbarS/>
                <Router/>
            </div>
        </BrowserRouter>
    );
}

export default App;
