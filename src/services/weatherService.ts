import axios from 'axios';
import type { CurrentWeather, WeatherForecast, Location } from '../types/weather';

// OpenWeatherMap API configuration
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Create axios instance with default config
const weatherAPI = axios.create({
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export class WeatherService {
  /**
   * Get current weather by city name
   */
  static async getCurrentWeatherByCity(cityName: string): Promise<CurrentWeather> {
    try {
      const response = await weatherAPI.get<CurrentWeather>(
        `${BASE_URL}/weather`,
        {
          params: {
            q: cityName,
            appid: API_KEY,
            units: 'metric', // Celsius by default
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`City "${cityName}" not found`);
        }
        if (error.response?.status === 401) {
          throw new Error('Invalid API key');
        }
      }
      throw new Error('Failed to fetch weather data');
    }
  }

  /**
   * Get current weather by coordinates (latitude, longitude)
   */
  static async getCurrentWeatherByCoords(lat: number, lon: number): Promise<CurrentWeather> {
    try {
      const response = await weatherAPI.get<CurrentWeather>(
        `${BASE_URL}/weather`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch weather data for location');
    }
  }

  /**
   * Get 5-day weather forecast by city name
   */
  static async getForecastByCity(cityName: string): Promise<WeatherForecast> {
    try {
      const response = await weatherAPI.get<WeatherForecast>(
        `${BASE_URL}/forecast`,
        {
          params: {
            q: cityName,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`City "${cityName}" not found`);
        }
      }
      throw new Error('Failed to fetch forecast data');
    }
  }

  /**
   * Get 5-day weather forecast by coordinates
   */
  static async getForecastByCoords(lat: number, lon: number): Promise<WeatherForecast> {
    try {
      const response = await weatherAPI.get<WeatherForecast>(
        `${BASE_URL}/forecast`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch forecast data for location');
    }
  }

  /**
   * Search for cities by name (for autocomplete/search)
   */
  static async searchCities(query: string, limit: number = 5): Promise<Location[]> {
    try {
      const response = await weatherAPI.get(
        `${GEO_URL}/direct`,
        {
          params: {
            q: query,
            limit,
            appid: API_KEY,
          },
        }
      );
      
      return response.data.map((city: any, index: number) => ({
        id: `${city.lat}-${city.lon}-${index}`,
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
      }));
    } catch (error) {
      throw new Error('Failed to search cities');
    }
  }

  /**
   * Get user's current location using browser geolocation
   */
  static async getCurrentLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('Location access denied by user'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information unavailable'));
              break;
            case error.TIMEOUT:
              reject(new Error('Location request timed out'));
              break;
            default:
              reject(new Error('An unknown error occurred while retrieving location'));
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }

  /**
   * Convert temperature between Celsius and Fahrenheit
   */
  static convertTemperature(temp: number, from: 'celsius' | 'fahrenheit', to: 'celsius' | 'fahrenheit'): number {
    if (from === to) return temp;
    
    if (from === 'celsius' && to === 'fahrenheit') {
      return (temp * 9/5) + 32;
    } else {
      return (temp - 32) * 5/9;
    }
  }

  /**
   * Get weather icon URL from OpenWeatherMap
   */
  static getWeatherIconUrl(iconCode: string, size: '2x' | '4x' = '2x'): string {
    return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
  }

  /**
   * Format Unix timestamp to readable date
   */
  static formatDate(timestamp: number, options?: Intl.DateTimeFormatOptions): string {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      ...options,
    });
  }

  /**
   * Format Unix timestamp to readable time
   */
  static formatTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}