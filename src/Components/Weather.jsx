import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getWeatherService, getForecastService } from '../services/weatherService';
import { addFavouriteLocation, removeFavouriteLocation } from '../services/userService';
import TodayWeather from './TodayWeather';
import ForecastWeather from './ForecastWeather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCalendarXmark } from '@fortawesome/free-solid-svg-icons';
import './Weather.css';
import InfoModal from './utils/InfoModal';

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
        } else {
            setWeatherData(returnedData);
            setCity(returnedData.name);
        }
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
        } else {
            setForecastData(returnedData);
            setCity(returnedData.city.name);
        }
    };

    useEffect(() => {
        if (location !== undefined) {
            getWeatherData(location);
            getForecastData(location);
        }
    }, [location]);

    useEffect(() => {
        if (city) {
            const fav = props.favouritePlace.some((favourite) => favourite.location === city);
            setAlreadyFavourited(fav);
        }
    }, [city, props.favouritePlace]);

    const handleAddToFavourites = async () => {
        const returnedData = await addFavouriteLocation(city);
        if (returnedData instanceof Error) {
            setError({
                message: returnedData.message === 'No token found, please login' ? returnedData.message : 'Favourite location added unsuccessfully.',
                type: 'post',
                display: true,
            });
        } else {
            setError({
                message: 'Favourite location added successfully.',
                type: `post`,
                display: false,
            });
            props.setLoadFavourite(true);
            setAlreadyFavourited(true);
            return returnedData;
        }
    };

    const handleRemoveFromFavourites = async () => {
        const returnedData = await removeFavouriteLocation(city);
        if (returnedData instanceof Error) {
            setError({
                message: 'Favourite location removed unsuccessfully.',
                type: 'post',
                display: true,
            });
        } else {
            setError({
                message: 'Favourite location removed successfully.',
                type: `post`,
                display: false,
            });
            props.setLoadFavourite(true);
            setAlreadyFavourited(false);
            return returnedData;
        }
    };

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
                    border: '2px solid black', padding: '5px', borderRadius: '5px', width: '200px',
                    display: 'inline-block',
                    overflow: 'hidden',
                    textAlign: 'center',
                }}>
                    {alreadyFavourited ? (
                        <>
                            <span onClick={handleRemoveFromFavourites} style={{
                                cursor: 'pointer',
                                width: '50px',
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
                            <span onClick={handleAddToFavourites} style={{
                                cursor: 'pointer',
                                width: '50px',
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
};

export default Weather;