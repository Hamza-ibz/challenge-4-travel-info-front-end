import Footer from './Components/Footer';
import Home from './Components/Home';
import Header from './Components/Header';
import Weather from './Components/Weather';
import Login from './Components/Login';
import Register from './Components/Register';
import React, { useEffect } from "react";
import { useState } from "react";
// import { Routes, Route } from 'react-router-dom';

import { Routes, Route } from "react-router-dom";

const App = () => {

    const [favouritePlace, setFavouritePlace] = useState([]);

    const refreshFavouriteLocations = (newLocationArray) => {
        setFavouritePlace(newLocationArray);
    }

    useEffect(() => {
    }, [favouritePlace]);

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/weather/:location" element={<Weather favouritePlace={favouritePlace} setFavouritePlace={setFavouritePlace} refreshFavouriteLocations={refreshFavouriteLocations} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
        </div>
    )
};

export default App;
