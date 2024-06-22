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
import InfoModal from './utils/InfoModal';



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
        // console.log(returnedData);
        // console.log(city);
    };

    useEffect(() => {
        if (location !== undefined) {
            getWeatherData(location);
            getForecastData(location);
            // console.log(forecastData.city.name);
        }
    }, [location]);

    useEffect(() => {
        if (city) {
            const fav = props.favouritePlace.some((favourite) => favourite.location === city);
            setAlreadyFavourited(fav);
        }
    }, [city, props.favouritePlace]);

    const handleAddToFavourites = () => {
        addFavourite();
        setAlreadyFavourited(true);
        // console.log(addToFav);

    };

    // const isFavourite = () => {
    //     let fav = false;

    //     props.favouritePlace.forEach((favourite) => {
    //         if (favourite.location === city) {
    //             setAlreadyFavourited(true);
    //             fav = true;
    //         }
    //     });

    //     console.log(fav);
    //     return fav;
    // }

    const addFavourite = async () => {

        const returnedData = await addFavouriteLocation(city);
        if (returnedData instanceof Error) {
            if (returnedData.message === 'No token found, please login') {
                // Handle the specific 'No token found' error
                setError({
                    message: returnedData.message,
                    type: 'auth',
                    display: true,
                });
            } else {
                setError({
                    message: 'Favourite location added unsuccessfully.',
                    type: 'post',
                    display: true,
                });
            }
        } else {
            setError({
                message: returnedData.message,
                type: `post`,
                display: false,
            });
            props.setLoadFavourite(true)
            // console.log(returnedData);
            // navigate(`/weather/${search}`);
            return returnedData;
        }
    }

    const handleRemoveFromFavourites = () => {
        removeFavourite();
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
                            <span onClick={() => handleAddToFavourites()} style={{
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
            {error.display && <InfoModal closeModal={() => setError({ ...error, display: false })} message={error.message} />}

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