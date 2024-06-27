import React from 'react'
import '../../css/Weather.css';

const TodayWeather = ({ weatherData, city }) => {

    // const showWeather = () => {
    if (Object.keys(weatherData).length === 0) {
        return <p>Loading current weather data...</p>;
    }

    const { main, weather } = weatherData;
    const description = weather[0].description;
    const temperature = Math.round(main.temp - 273.15);
    const icon = weather[0].icon;

    return (
        <div className="col-6 col-md-4 today-weather">
            <h2>Weather in {city.charAt(0).toUpperCase() + city.slice(1)} Today</h2>
            <div>
                <div >
                    <img src={`/assets/weather-icons/${icon}.svg`} alt="Weather Icon" />
                </div>
                <div className="large-font">Temperature: {temperature}°C</div>
                <div className="large-font">Weather: {description}</div>
            </div>
        </div>
    );
    // };

}

export default TodayWeather