# 🌤️ Weather Dashboard

A modern, responsive weather application built with React, TypeScript, and Vite. Features real-time weather data, geolocation support, and a beautiful glass-morphism design.

## ✨ Features

- **Real-time Weather Data** - Powered by OpenWeatherMap API
- **Geolocation Support** - Automatic location detection
- **City Search** - Search weather for any city worldwide
- **5-Day Forecast** - Extended weather predictions
- **Responsive Design** - Works perfectly on all devices
- **Modern UI** - Glass-morphism design with smooth animations
- **TypeScript** - Full type safety and better development experience
- **Error Handling** - Comprehensive error states and user feedback

## 🚀 Live Demo

[View Live Demo](https://your-username.github.io/weather-dashboard) *(Update this link after deployment)*

## 📷 Screenshots

### Desktop View
![Weather Dashboard Desktop](https://via.placeholder.com/800x500/667eea/ffffff?text=Weather+Dashboard+Desktop)

### Mobile View
![Weather Dashboard Mobile](https://via.placeholder.com/300x600/667eea/ffffff?text=Weather+Dashboard+Mobile)

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with animations
- **OpenWeatherMap API** - Weather data source
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Add your OpenWeatherMap API key to `.env`:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🌟 Key Components

- **WeatherService** - API integration and data fetching
- **App Component** - Main application logic and state management  
- **Responsive Design** - Mobile-first approach with CSS Grid/Flexbox
- **Error Handling** - User-friendly error messages and loading states

## 🎨 Design Features

- Glass-morphism UI design
- Smooth animations and transitions
- Responsive layout for all screen sizes
- Modern color gradients and shadows
- Interactive hover effects

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Vite](https://vitejs.dev/) for the amazing build tool

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
