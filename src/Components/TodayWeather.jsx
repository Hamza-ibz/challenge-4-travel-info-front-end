import React from 'react'

const TodayWeather = ({ weatherData, city }) => {

    // console.log(city);
    // console.log(weatherData);

    // const showWeather = () => {
    if (Object.keys(weatherData).length === 0) {
        return <p>Loading current weather data...</p>;
    }

    const { main, weather } = weatherData;
    const description = weather[0].description;
    const temperature = Math.round(main.temp - 273.15);
    const icon = weather[0].icon;

    return (
        <div>
            <h2>Weather in {city.charAt(0).toUpperCase() + city.slice(1)}</h2>
            <div>
                <div >
                    <img src={`/assets/weather-icons/${icon}.svg`} alt="Weather Icon" />
                </div>
                <div>Temperature: {temperature}°C</div>
                <div>Weather: {description}</div>
            </div>
        </div>
    );
    // };

}

export default TodayWeather