import React from 'react'

const ForecastWeather = ({ forecastData, city }) => {

    if (Object.keys(forecastData).length === 0) {
        return <p>Loading current forecast data...</p>;
    }
    console.log(forecastData.list)
    const days = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 4);
    // console.log();

    const forecast = days.map((day, index) => {

        const dayName = new Date(day.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long' })
        const date = new Date(day.dt * 1000).toLocaleDateString('en-GB')

        return (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-6" style={{ flex: 1 }}>
                <h3>Forecast for {dayName}</h3>
                <div><img src={`/assets/weather-icons/${day.weather[0].icon}.svg`} alt="Weather Icon" /></div>
                <div>Date: {date}</div>
                <div>Weather: {day.weather[0].description}</div>
                <div>Temperature: {Math.round(day.main.temp - 273.15)}°C</div>
            </div>
        )
    })

    // { new Date(item.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long' }) }

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