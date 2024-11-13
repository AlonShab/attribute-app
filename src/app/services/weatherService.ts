import axios from 'axios';
import {OpenMetroDailyWeather, WeatherData, WeatherDataResponse} from '@/types/weather';

// Fetch weather data with encrypted dates
export const fetchWeatherData = async (startDate: Date, endDate: Date): Promise<OpenMetroDailyWeather> => {
    const response = await axios.post('/api/weather', {
        startDate,
        endDate
    });

    return response.data;
};
