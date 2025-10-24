@echo off
echo Building the Weather Dashboard...
call npm run build

echo.
echo Build completed! 
echo.
echo To deploy to GitHub Pages manually:
echo 1. Go to your repository: https://github.com/isholaolatunde/weather-update-app
echo 2. Go to Settings ^> Pages
echo 3. Choose "Upload a folder" or use GitHub Desktop to upload the 'dist' folder
echo.
echo Your site will be available at:
echo https://isholaolatunde.github.io/weather-update-app/
echo.
pause