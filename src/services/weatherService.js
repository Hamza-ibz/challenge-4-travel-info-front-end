

export const getWeatherService = async (location) => {
    const encodedLocation = encodeURIComponent(location);
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${encodedLocation}&appid=1b0be74df3a723caef64b6a7229426b9`);
        console.log(response.data);
        return response.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
};
