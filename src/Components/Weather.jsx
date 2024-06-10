import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getWeatherService } from '../services/weatherService';
import axios from 'axios';
// rafce to create code structure

const Weather = () => {

    const { location } = useParams();
    const [weatherData, setWeatherData] = useState({});
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

    useEffect(() => {
        if (location !== undefined) {
            getWeatherData(location);
        }
    }, [location]);

    const showWeather = () => {
        if (!weatherData || !weatherData.main) {
            return <div>Loading current weather...</div>;
        }

        const { main, weather } = weatherData;
        const weatherDescription = weather[0].description;
        const temperatureCelsius = Math.round(main.temp - 273.15);
        const weatherIcon = weather[0].icon;

        return (
            <div className="weather-box" data-test-id="weather-data">
                <h2>Weather in {city.charAt(0).toUpperCase() + city.slice(1)}</h2>
                <div className="weather-info">
                    <div className="weather-icon">
                        <img src={`/assets/weather-icons/${weatherIcon}.svg`} alt="Weather Icon" />
                    </div>
                    <div>Temperature: {temperatureCelsius}°C</div>
                    <div>Weather: {weatherDescription}</div>
                </div>
            </div>
        );
    };

    // useEffect(() => {
    //     getWeatherData(location);
    //     renderWeather();
    // }, [])


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
                <div>
                    {showWeather()}
                </div>
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