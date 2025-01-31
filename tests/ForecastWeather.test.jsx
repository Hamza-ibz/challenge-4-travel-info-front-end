import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ForecastWeather from '../src/Components/pages/weather/ForecastWeather.jsx';
import testForecastData from '../tests/data/testForecastData.js';

describe('ForecastWeather Component', () => {
    test('displays loading text when forecast data is not available', () => {
        // Arrange: Render the ForecastWeather component with empty forecast data
        render(<ForecastWeather forecastData={{}} city="Test City" />);

        // Assert: Verify that the loading text is displayed
        expect(screen.getByText(/Loading current forecast data.../i)).toBeInTheDocument();
    });

    test('displays forecast data correctly when available', async () => {
        // Arrange: Render the ForecastWeather component with test forecast data
        render(<ForecastWeather forecastData={testForecastData} city="Test City" />);

        // Act & Assert: Wait for the forecast data to be displayed and verify each forecast day's data
        await waitFor(() => {
            const forecasts = testForecastData.list.filter((item, index) => index % 8 === 0).slice(1, 5);

            forecasts.forEach((day, index) => {
                const dayName = new Date(day.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long' });
                const date = new Date(day.dt * 1000).toLocaleDateString('en-GB');

                // Assert: Check that each piece of forecast data is rendered correctly
                expect(screen.getByText(new RegExp(`Forecast for ${dayName}`, 'i'))).toBeInTheDocument();
                expect(screen.getByText(new RegExp(`Date: ${date}`, 'i'))).toBeInTheDocument();
                expect(screen.getByText(new RegExp(`Weather: ${day.weather[0].description}`, 'i'))).toBeInTheDocument();
                expect(screen.getByText(new RegExp(`Temperature: ${Math.round(day.main.temp - 273.15)}°C`, 'i'))).toBeInTheDocument();
            });
        });
    });
});
