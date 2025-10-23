import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  MapPin, 
  Thermometer, 
  Eye, 
  Wind, 
  Droplets,
  Sun,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { WeatherService } from './services/weatherService';
import type { CurrentWeather, WeatherForecast } from './types/weather';
import './App.css';

function App() {
  // State management
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchWeather = useCallback(async (cityName: string) => {
    if (!cityName.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const weather = await WeatherService.getCurrentWeatherByCity(cityName);
      const forecastData = await WeatherService.getForecastByCity(cityName);
      setCurrentWeather(weather);
      setForecast(forecastData);
      setSearchQuery('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search weather');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load weather for default city on app start
  const loadDefaultWeather = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to get user's location first
      try {
        const coords = await WeatherService.getCurrentLocation();
        const weather = await WeatherService.getCurrentWeatherByCoords(coords.lat, coords.lon);
        const forecastData = await WeatherService.getForecastByCoords(coords.lat, coords.lon);
        
        setCurrentWeather(weather);
        setForecast(forecastData);
      } catch {
        // Fallback to London if geolocation fails
        console.log('Geolocation failed, using London as default');
        await searchWeather('London');
      }
    } catch {
      setError('Failed to load weather data');
    } finally {
      setIsLoading(false);
    }
  }, [searchWeather]);

  useEffect(() => {
    loadDefaultWeather();
  }, [loadDefaultWeather]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchWeather(searchQuery);
  };

  const useCurrentLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const coords = await WeatherService.getCurrentLocation();
      const weather = await WeatherService.getCurrentWeatherByCoords(coords.lat, coords.lon);
      const forecastData = await WeatherService.getForecastByCoords(coords.lat, coords.lon);
      
      setCurrentWeather(weather);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get current location');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <Sun className="app-icon" size={32} />
            <h1>Weather Dashboard</h1>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button" disabled={isLoading}>
                {isLoading ? <Loader2 className="loading-icon" size={16} /> : 'Search'}
              </button>
            </div>
          </form>

          {/* Current Location Button */}
          <button onClick={useCurrentLocation} className="location-button" disabled={isLoading}>
            <MapPin size={16} />
            Use My Location
          </button>
        </div>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {isLoading && (
          <div className="loading-container">
            <Loader2 className="loading-spinner" size={32} />
            <p>Loading weather data...</p>
          </div>
        )}

        {currentWeather && !isLoading && (
          <div className="weather-container">
            {/* Current Weather Card */}
            <div className="current-weather-card">
              <div className="current-weather-header">
                <div className="location-info">
                  <h2>{currentWeather.name}, {currentWeather.country}</h2>
                  <p className="weather-description">
                    {currentWeather.weather[0]?.description}
                  </p>
                  <p className="last-updated">
                    Updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <div className="weather-icon">
                  <img 
                    src={WeatherService.getWeatherIconUrl(currentWeather.weather[0]?.icon)} 
                    alt={currentWeather.weather[0]?.description}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/weather-placeholder.png';
                    }}
                  />
                </div>
              </div>

              <div className="temperature-display">
                <span className="main-temperature">
                  {Math.round(currentWeather.main.temp)}°C
                </span>
                <span className="feels-like">
                  Feels like {Math.round(currentWeather.main.feels_like)}°C
                </span>
              </div>

              <div className="weather-stats">
                <div className="stat">
                  <Thermometer size={18} />
                  <div className="stat-content">
                    <span className="stat-label">Min/Max</span>
                    <span className="stat-value">
                      {Math.round(currentWeather.main.temp_min)}° / {Math.round(currentWeather.main.temp_max)}°
                    </span>
                  </div>
                </div>
                
                <div className="stat">
                  <Droplets size={18} />
                  <div className="stat-content">
                    <span className="stat-label">Humidity</span>
                    <span className="stat-value">{currentWeather.main.humidity}%</span>
                  </div>
                </div>
                
                <div className="stat">
                  <Wind size={18} />
                  <div className="stat-content">
                    <span className="stat-label">Wind Speed</span>
                    <span className="stat-value">{Math.round(currentWeather.wind.speed * 3.6)} km/h</span>
                  </div>
                </div>
                
                <div className="stat">
                  <Eye size={18} />
                  <div className="stat-content">
                    <span className="stat-label">Visibility</span>
                    <span className="stat-value">{(currentWeather.visibility / 1000).toFixed(1)} km</span>
                  </div>
                </div>

                <div className="stat">
                  <Sun size={18} />
                  <div className="stat-content">
                    <span className="stat-label">Sunrise</span>
                    <span className="stat-value">{WeatherService.formatTime(currentWeather.sys.sunrise)}</span>
                  </div>
                </div>
                
                <div className="stat">
                  <Sun size={18} />
                  <div className="stat-content">
                    <span className="stat-label">Sunset</span>
                    <span className="stat-value">{WeatherService.formatTime(currentWeather.sys.sunset)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Forecast Preview */}
            {forecast && (
              <div className="forecast-preview">
                <h3>5-Day Forecast</h3>
                <div className="forecast-items">
                  {forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((item, index) => (
                    <div key={item.dt} className="forecast-item">
                      <span className="forecast-day">
                        {index === 0 ? 'Today' : WeatherService.formatDate(item.dt)}
                      </span>
                      <img 
                        src={WeatherService.getWeatherIconUrl(item.weather[0]?.icon)} 
                        alt={item.weather[0]?.description}
                        className="forecast-icon"
                      />
                      <span className="forecast-temp">
                        {Math.round(item.main.temp)}°
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!currentWeather && !isLoading && !error && (
          <div className="welcome-message">
            <Sun size={48} className="welcome-icon" />
            <h2>Welcome to Weather Dashboard</h2>
            <p>Search for a city or use your current location to get started!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
