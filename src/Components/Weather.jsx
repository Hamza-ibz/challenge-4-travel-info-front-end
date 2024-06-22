import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getWeatherService, getForecastService } from '../services/weatherService';
// import { getForecastService } from '../services/weatherService';
import { addFavouriteLocation, removeFavouriteLocation } from '../services/userService';
import TodayWeather from './TodayWeather';
import ForecastWeather from './ForecastWeather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCalendarXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Weather.css';


// rafce to create code structure

const Weather = (props) => {

    const { location } = useParams();
    const [weatherData, setWeatherData] = useState({});
    const [forecastData, setForecastData] = useState({});
    const [city, setCity] = useState('');
    const [alreadyFavourited, setAlreadyFavourited] = useState(false);
    const [error, setError] = useState({ message: ``, type: ``, display: false });

    const getWeatherData = async (location) => {
        const returnedData = await getWeatherService(location);
        if (returnedData instanceof Error) {
            setError({
                message: returnedData.message,
                type: `get`,
                display: true,
            });
            setWeatherData({});
        }

        setWeatherData(returnedData);
        setCity(returnedData.name);
        // console.log(weatherData);
        // console.log(city);
    };

    const getForecastData = async (location) => {
        const returnedData = await getForecastService(location);
        if (returnedData instanceof Error) {
            setError({
                message: returnedData.message,
                type: `get`,
                display: true,
            });
            setForecastData({});
        }

        setForecastData(returnedData);
        setCity(returnedData.city.name);
        console.log(returnedData);
        // console.log(city);
    };

    useEffect(() => {
        if (location !== undefined) {
            getWeatherData(location);
            getForecastData(location);
        }
    }, [location]);

    const handleAddToFavourites = (weatherData, currentFavourites) => {
        if (isUniqueLocation(weatherData, currentFavourites)) {
            const updatedFavourites = createUpdatedFavourites(weatherData, currentFavourites);
            updateFavouritesState(updatedFavourites);
            const addToFav = addFavourite();
            // console.log(addToFav);
        }
    };

    const isUniqueLocation = (weatherData, currentFavourites) => {
        return !currentFavourites.some(location => location.location === weatherData.name);
    };

    const createUpdatedFavourites = (weatherData, currentFavourites) => {
        const newFavourite = {
            location: weatherData.name,
            country: weatherData.sys.country,
        };
        return [...currentFavourites, newFavourite];
    };

    const updateFavouritesState = (updatedFavourites) => {
        setAlreadyFavourited(true);
        localStorage.setItem('favouritePlace', JSON.stringify(updatedFavourites));
        props.refreshFavouriteLocations(updatedFavourites);
    };

    const addFavourite = async () => {
        // if (!search.trim()) return;
        const returnedData = await addFavouriteLocation(city);
        if (returnedData instanceof Error) {
            setError({
                message: 'Favourite location added unsuccessfully.',
                type: 'post',
                display: true,
            });
        } else {
            setError({
                message: returnedData.message,
                type: `post`,
                display: false,
            });
            // console.log(returnedData);
            // navigate(`/weather/${search}`);
            return returnedData;
        }
    }



    // const addToFavourite = (weatherData, favouriteLocations) => {
    //     if (!checkForDuplicates(weatherData, favouriteLocations)) {
    //         const newLocation = { location: weatherData.name, country: weatherData.sys.country };
    //         const newFavouriteLocations = [...favouriteLocations, newLocation];
    //         setAlreadyFavourited(true);
    //         localStorage.setItem('favouriteLocations', JSON.stringify(newFavouriteLocations));
    //         props.updateFavouriteLocations(newFavouriteLocations);
    //     }
    // }

    // const removeFromFavourites = (city) => {
    //     const newLocationArray = props.favouritePlace.filter((data) => data.location !== city);
    //     localStorage.setItem('favouritePlace', JSON.stringify(newLocationArray));
    //     props.setFavouritePlace(newLocationArray);
    //     setAlreadyFavourited(false);
    // }

    const handleRemoveFromFavourites = (city) => {
        const updatedFavourites = getUpdatedFavouritesList(city);
        saveUpdatedFavourites(updatedFavourites);
        updateFavouritesStateRemoved(updatedFavourites);
        const removeToFav = removeFavourite();
    };

    const getUpdatedFavouritesList = (city) => {
        return props.favouritePlace.filter((data) => data.location !== city);
    };

    const saveUpdatedFavourites = (updatedFavourites) => {
        localStorage.setItem('favouritePlace', JSON.stringify(updatedFavourites));
    };

    const updateFavouritesStateRemoved = (updatedFavourites) => {
        props.setFavouritePlace(updatedFavourites);
        setAlreadyFavourited(false);
    };

    const removeFavourite = async () => {
        // if (!search.trim()) return;
        const returnedData = await removeFavouriteLocation(city);
        if (returnedData instanceof Error) {
            setError({
                message: 'Favourite location removed unsuccessfully.',
                type: 'post',
                display: true,
            });
        } else {
            setError({
                message: returnedData.message,
                type: `post`,
                display: false,
            });
            // console.log(returnedData);
            // navigate(`/weather/${search}`);
            return returnedData;
        }
    }

    // const checkForDuplicates = (weatherData, favouriteLocations) => {
    //     return favouriteLocations.some(location => location.location === weatherData.name);
    // };


    return (
        <div className="container-fluid">
            <div className="row">
                <div>
                    <div>
                        <h1>Telling you about..</h1>
                        <h2>{city || 'Loading...'}</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <TodayWeather weatherData={weatherData} city={city} />
                <div style={{
                    border: '2px solid black', padding: '5px', borderRadius: '5px', width: '200px', // Set your desired width here
                    display: 'inline-block',
                    overflow: 'hidden',
                    textAlign: 'center',
                }}>
                    {alreadyFavourited ? (
                        <>
                            <span onClick={() => handleRemoveFromFavourites(city)} style={{
                                cursor: 'pointer',
                                width: '50px', // Set your desired width here
                                display: 'inline-block',
                                overflow: 'hidden',
                                textAlign: 'center',
                            }}>
                                <FontAwesomeIcon icon={faCalendarXmark} size="2x" className="hover-icon-remove" />
                            </span>
                            <p>Click icon to remove from favourites</p>
                        </>
                    ) : (
                        <>
                            <span onClick={() => handleAddToFavourites(weatherData, props.favouritePlace)} style={{
                                cursor: 'pointer',
                                width: '50px', // Set your desired width here
                                display: 'inline-block',
                                overflow: 'hidden',
                                textAlign: 'center',
                            }}>
                                <FontAwesomeIcon icon={faBookmark} alt="Favourited" size="2x" className="hover-icon-bookmark" />
                            </span>
                            <p>Click icon to add to favourites</p>
                        </>

                    )}
                </div>

                <ForecastWeather forecastData={forecastData} city={city} />
            </div>

        </div>

    )
}

export default Weather;

// // rafce to create code structure

// const Weather = () => {
//     return (
//         <div>Weather</div>
//     )
// }

// export default Weather