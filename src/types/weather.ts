// Weather data types for API responses and app state

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  id: number;
  name: string; // City name
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number; // Unix timestamp
  sys: {
    sunrise: number;
    sunset: number;
  };
  timezone: number;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  dt_txt: string;
}

export interface WeatherForecast {
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface Location {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  isFavorite?: boolean;
}

export interface WeatherError {
  message: string;
  code?: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WeatherView = 'current' | 'forecast' | 'map';