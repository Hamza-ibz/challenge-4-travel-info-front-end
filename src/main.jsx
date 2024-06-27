import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from "./App.jsx";

// Bootstrap Here
import "bootstrap/dist/css/bootstrap.min.css"; // they are in node_modules under bootstrap->dist->css folder // they are in node_modules under bootstrap->dist->css folder
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // they are in node_modules under bootstrap->dist->css folder // they are in node_modules under bootstrap->dist->css folder


ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>

);
