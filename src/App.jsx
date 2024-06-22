import Footer from './Components/Footer';
import Home from './Components/Home';
import Header from './Components/Header';
import Weather from './Components/Weather';
import Login from './Components/Login';
import Register from './Components/Register';
import React, { useEffect } from "react";
import { getFavouriteLocations } from './services/userService';
import { useState } from "react";
import "./App.css"
// import { Routes, Route } from 'react-router-dom';

import { Routes, Route } from "react-router-dom";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const [favouritePlace, setFavouritePlace] = useState([]);

    const [loadFavourite, setLoadFavourite] = useState(false);

    const loadFavourites = async () => {
        const fav = await getFavouriteLocations();
        // console.log(fav)
        setFavouritePlace(fav);
        // console.log(favouritePlace)
    };

    useEffect(() => {
        if (localStorage.getItem("token"))
            setLoggedIn("true");
    }, []);

    useEffect(() => {
        setLoadFavourite(false);
        loadFavourites();
    }, [loggedIn, loadFavourite]);


    return (
        <div className="app-container">
            <Header />
            <div className="content-wrap">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/weather/:location" element={<Weather favouritePlace={favouritePlace} setLoadFavourite={setLoadFavourite} loggedIn={loggedIn} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/header" element={<Header />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
};

export default App;
