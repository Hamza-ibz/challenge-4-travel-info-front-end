import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from './Components/Footer';
import Home from './Components/pages/home/Home';
import Header from './Components/Header';
import Weather from './Components/pages/weather/Weather';
import Login from './Components/pages/user/Login';
import Register from './Components/pages/user/Register';
import AllFavouritePlaces from './Components/pages/favourites/AllFavouritePlaces';
import UpdatePassword from './Components/pages/user/UpdatePassword'; // Import UpdatePassword component
import { getFavouriteLocations } from './services/userService';
import "./App.css";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [favouritePlace, setFavouritePlace] = useState([]);
    const [loadFavourite, setLoadFavourite] = useState(false);

    const loadFavourites = async () => {
        if (localStorage.getItem("token")) {
            const returnedData = await getFavouriteLocations();
            setFavouritePlace(returnedData);
        }
    };

    const resetFavourites = () => {
        setFavouritePlace([]);
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
            <Header favouritePlace={favouritePlace} resetFavourites={resetFavourites} />
            <div className="content-wrap">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/weather/:location" element={<Weather favouritePlace={favouritePlace} setLoadFavourite={setLoadFavourite} loggedIn={loggedIn} />} />
                    <Route path="/login" element={<Login setLoggedIn={setLoggedIn} loadFavourites={loadFavourites} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/update-password" element={<UpdatePassword />} /> {/* Add UpdatePassword route */}
                    <Route path="/header" element={<Header />} />
                    <Route path="/all-favourites" element={<AllFavouritePlaces favouritePlace={favouritePlace} setLoadFavourite={setLoadFavourite} />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default App;


