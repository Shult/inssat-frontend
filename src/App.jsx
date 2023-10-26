import React from 'react';
import {BrowserRouter } from "react-router-dom";
import Router from "./_navigation/Router";
import NavAside from "./_components/Navbars/NavAside";

function App() {

    const style = {
        background: "var(--mediumGrey)",
        position: "fixed",
        maxWidth: "85%",
        height: "inherit",
        left: "15%",

        padding: "1rem"
    }

    return (
        <BrowserRouter>
            <div className="App line">
                <NavAside/>
                <div style={style}>
                    <Router/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
