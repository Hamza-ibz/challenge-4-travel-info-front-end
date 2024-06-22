import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from './Components/Footer';
import Home from './Components/Home';
import Header from './Components/Header';
import Weather from './Components/Weather';
import Login from './Components/Login';
import Register from './Components/Register';
import AllFavouritePlaces from './Components/AllFavouritePlaces'; // Import the new component
import { getFavouriteLocations } from './services/userService';
import "./App.css";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [favouritePlace, setFavouritePlace] = useState([]);
    const [loadFavourite, setLoadFavourite] = useState(false);

    const loadFavourites = async () => {
        const fav = await getFavouriteLocations();
        setFavouritePlace(fav);
    };

    useEffect(() => {
        if (localStorage.getItem("token"))
            setLoggedIn(true);
    }, []);

    useEffect(() => {
        if (loggedIn) {
            loadFavourites();
        }
    }, [loggedIn]);

    useEffect(() => {
        if (loadFavourite) {
            setLoadFavourite(false);
            loadFavourites();
        }
    }, [loadFavourite]);

    return (
        <div className="app-container">
            <Header favouritePlace={favouritePlace} />
            <div className="content-wrap">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/weather/:location" element={<Weather favouritePlace={favouritePlace} setLoadFavourite={setLoadFavourite} loggedIn={loggedIn} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/header" element={<Header />} />
                    <Route path="/all-favourites" element={<AllFavouritePlaces favouritePlace={favouritePlace} />} /> {/* New route */}
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default App;

