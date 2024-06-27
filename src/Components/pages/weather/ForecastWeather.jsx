import React from 'react'
import '../../css/Weather.css';

const ForecastWeather = ({ forecastData, city }) => {

    if (Object.keys(forecastData).length === 0) {
        return <p>Loading current forecast data...</p>;
    }
    const days = forecastData.list.filter((item, index) => index % 8 === 0).slice(1, 5);

    const forecast = days.map((day, index) => {

        const dayName = new Date(day.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long' })
        const date = new Date(day.dt * 1000).toLocaleDateString('en-GB')

        return (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-6 forecast-weather" style={{ flex: 1 }}>
                <h3>Forecast for {dayName}</h3>
                <div><img src={`/assets/weather-icons/${day.weather[0].icon}.svg`} alt="Weather Icon" /></div>
                <div className="large-font" >Date: {date}</div>
                <div className="large-font" >Weather: {day.weather[0].description}</div>
                <div className="large-font" >Temperature: {Math.round(day.main.temp - 273.15)}°C</div>
            </div>
        )
    })

    return (
        <>
            <div className="row">
                {forecast}
            </div>

        </>
    );
    // };
}

export default ForecastWeather