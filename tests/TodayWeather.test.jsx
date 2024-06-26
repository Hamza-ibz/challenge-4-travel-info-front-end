import React from 'react';
import { render, screen } from '@testing-library/react';
import TodayWeather from '../src/Components/TodayWeather';

describe('TodayWeather Component', () => {
    test('displays loading message when no weather data is available', () => {
        render(<TodayWeather weatherData={{}} city="London" />);

        expect(screen.getByText(/Loading current weather data.../i)).toBeInTheDocument();
    });

    test('displays weather data when available', () => {
        const mockWeatherData = {
            main: { temp: 298.15 },
            weather: [{ description: 'clear sky', icon: '01d' }]
        };

        render(<TodayWeather weatherData={mockWeatherData} city="London" />);

        expect(screen.getByText(/Weather in London Today/i)).toBeInTheDocument();
        expect(screen.getByText(/Temperature: 25°C/i)).toBeInTheDocument();
        expect(screen.getByText(/Weather: clear sky/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Weather Icon/i)).toHaveAttribute('src', '/assets/weather-icons/01d.svg');
    });
});

