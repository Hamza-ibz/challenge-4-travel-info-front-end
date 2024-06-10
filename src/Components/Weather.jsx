import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getWeatherService } from '../services/weatherService';
import { getForecastService } from '../services/weatherService';
import TodayWeather from './TodayWeather';
import ForecastWeather from './ForecastWeather';
import axios from 'axios';
// rafce to create code structure

const Weather = () => {

    const { location } = useParams();
    const [weatherData, setWeatherData] = useState({});
    const [forecastData, setForecastData] = useState({});
    const [city, setCity] = useState('');
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
        }
    }, [location]);


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