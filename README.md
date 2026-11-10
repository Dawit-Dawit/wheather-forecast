# Weather Outlook

A responsive weather dashboard built with HTML, CSS, and vanilla JavaScript ES modules. It uses the free Open-Meteo geocoding and forecast APIs; no API key or build step is needed.

## Run it locally

1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Search for a city, such as **Addis Ababa**, to load its current conditions and five-day forecast.

Opening the page through a local web server is recommended for ES modules. An internet connection is required to fetch weather data.

## Project files

- `index.html` contains the accessible page structure, search forms, status messages, and forecast sections.
- `assets/css/style.css` styles the dashboard and adapts it to desktop, tablet, and mobile screens.
- `assets/js/app.js` validates searches and coordinates geocoding, location selection, and forecast loading.
- `assets/js/weather.js` fetches city matches and weather data, checks HTTP responses, and maps WMO weather codes.
- `assets/js/ui.js` creates accessible loading, error, location-choice, current-weather, and daily forecast views.
- `assets/images/` is reserved for optional local images; the app currently uses text and emoji icons instead.

## Weather data and attribution

Weather data is provided by [Open-Meteo](https://open-meteo.com/). This app requests city matches from the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) and current plus five-day forecast data from the [Open-Meteo Forecast API](https://open-meteo.com/en/docs).

## Try these cases

- Search **Addis Ababa** and confirm the current conditions and five forecast days appear.
- Search another city, such as **Tokyo**.
- Search a made-up name to see the no-results message.
- Submit an empty search to see the input validation message.
- Disconnect from the internet or block an API request to see the error state.
- Resize the browser or use device emulation to check the mobile layout.
