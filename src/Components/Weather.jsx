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
        setCity(returnedData.city.name);
        console.log(weatherData);
        console.log(city);
    };

    useEffect(() => {
        if (location !== undefined) {
            getWeatherData(location);
        }
    }, [location]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-4">
                </div>
                <div className="col-3">
                    <div>
                        <h1>Telling you about..</h1>
                        <h2>{city || 'Loading...'}</h2>
                    </div>
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