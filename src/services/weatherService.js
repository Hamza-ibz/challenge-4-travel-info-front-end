import axios from 'axios';

export const getWeatherService = async (location) => {
    const encodedLocation = encodeURIComponent(location);
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1b0be74df3a723caef64b6a7229426b9`);
        // console.log(response.data);
        return response.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
};

export const getForecastService = async (location) => {
    const encodedLocation = encodeURIComponent(location);
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=1b0be74df3a723caef64b6a7229426b9`);
        // console.log(response.data);
        return response.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
};
