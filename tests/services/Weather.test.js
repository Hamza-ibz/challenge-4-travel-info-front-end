import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getWeatherService, getForecastService } from '../../src/services/weatherService';

describe('Weather Service', () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    afterAll(() => {
        mock.restore();
    });

    describe('getWeatherService', () => {
        it('should return weather data when the API call is successful', async () => {
            const location = 'New York';
            const mockData = { weather: [{ description: 'clear sky' }], main: { temp: 298.15 } };

            mock.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1b0be74df3a723caef64b6a7229426b9`).reply(200, mockData);

            const result = await getWeatherService(location);

            expect(result).toEqual(mockData);
        });

        it('should return an error when the API call fails', async () => {
            const location = 'InvalidCity';
            const mockError = new Error('Request failed with status code 404');

            mock.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1b0be74df3a723caef64b6a7229426b9`).reply(404, mockError);

            const result = await getWeatherService(location);

            expect(result).toEqual(mockError);
        });
    });

    describe('getForecastService', () => {
        it('should return forecast data when the API call is successful', async () => {
            const location = 'New York';
            const mockData = { list: [{ weather: [{ description: 'clear sky' }], main: { temp: 298.15 } }] };

            mock.onGet(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=1b0be74df3a723caef64b6a7229426b9`).reply(200, mockData);

            const result = await getForecastService(location);

            expect(result).toEqual(mockData);
        });

        it('should return an error when the API call fails', async () => {
            const location = 'InvalidCity';
            const mockError = new Error('Request failed with status code 404');

            mock.onGet(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=1b0be74df3a723caef64b6a7229426b9`).reply(404, mockError);

            const result = await getForecastService(location);

            expect(result).toEqual(mockError);
        });
    });
});
