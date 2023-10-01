import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserService from "./services/UserServices";
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from "react-redux";
import {store} from "./_store/store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const renderApp = () => root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
UserService.initKeycloak(renderApp);