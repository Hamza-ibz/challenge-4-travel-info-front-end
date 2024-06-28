import React from 'react';
import { render, screen } from '@testing-library/react';
import TodayWeather from '../src/Components/pages/weather/TodayWeather';

describe('TodayWeather Component', () => {
    test('displays loading message when no weather data is available', () => {
        // Arrange: Render the component with empty weather data
        render(<TodayWeather weatherData={{}} city="London" />);

        // Assert: Check if the loading message is displayed
        expect(screen.getByText(/Loading current weather data.../i)).toBeInTheDocument();
    });

    test('displays weather data when available', () => {
        // Arrange: Mock the weather data
        const mockWeatherData = {
            main: { temp: 298.15 },
            weather: [{ description: 'clear sky', icon: '01d' }]
        };

        // Act: Render the component with the mocked weather data
        render(<TodayWeather weatherData={mockWeatherData} city="London" />);

        // Assert: Check if the weather data is displayed correctly
        expect(screen.getByText(/Weather in London Today/i)).toBeInTheDocument();
        expect(screen.getByText(/Temperature: 25°C/i)).toBeInTheDocument();
        expect(screen.getByText(/Weather: clear sky/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Weather Icon/i)).toHaveAttribute('src', '/assets/weather-icons/01d.svg');
    });
});

