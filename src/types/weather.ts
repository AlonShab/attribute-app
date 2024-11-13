export interface OpenMetroDailyWeather {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[]
}

export interface OpenMetroDailyUnits {
    time: string,
    temperature_2m_max: string;
    temperature_2m_min: string;
}

export interface WeatherDataResponse {
    daily: OpenMetroDailyWeather
    daily_units: OpenMetroDailyUnits
    elevation: number;
    generationtime_ms: number;
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    utc_offset_seconds: number;
}

export interface WeatherData {
    dates: string[];
    maxTemp: number[];
    minTemp: number[];
}