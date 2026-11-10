const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function searchCities(cityName) {
  const params = new URLSearchParams({
    name: cityName,
    count: "5",
    language: "en",
    format: "json"
  });
  const response = await fetch(`${GEOCODING_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`City search failed (HTTP ${response.status}). Please try again.`);
  }

  const data = await response.json();
  return Array.isArray(data.results) ? data.results : [];
}

export async function getForecast(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "5"
  });
  const response = await fetch(`${FORECAST_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`Weather forecast failed (HTTP ${response.status}). Please try again.`);
  }

  return response.json();
}

export function getWeatherDescription(code) {
  const descriptions = {
    0: ["Clear sky", "☀️"],
    1: ["Mainly clear", "🌤️"],
    2: ["Partly cloudy", "⛅"],
    3: ["Overcast", "☁️"],
    45: ["Fog", "🌫️"],
    48: ["Depositing rime fog", "🌫️"],
    51: ["Light drizzle", "🌦️"],
    53: ["Moderate drizzle", "🌦️"],
    55: ["Dense drizzle", "🌧️"],
    56: ["Light freezing drizzle", "🌧️"],
    57: ["Dense freezing drizzle", "🌧️"],
    61: ["Slight rain", "🌦️"],
    63: ["Moderate rain", "🌧️"],
    65: ["Heavy rain", "🌧️"],
    66: ["Light freezing rain", "🌧️"],
    67: ["Heavy freezing rain", "🌧️"],
    71: ["Slight snow", "🌨️"],
    73: ["Moderate snow", "🌨️"],
    75: ["Heavy snow", "❄️"],
    77: ["Snow grains", "🌨️"],
    80: ["Slight rain showers", "🌦️"],
    81: ["Moderate rain showers", "🌧️"],
    82: ["Violent rain showers", "🌧️"],
    85: ["Slight snow showers", "🌨️"],
    86: ["Heavy snow showers", "❄️"],
    95: ["Thunderstorm", "⛈️"],
    96: ["Thunderstorm with light hail", "⛈️"],
    99: ["Thunderstorm with heavy hail", "⛈️"]
  };

  return descriptions[code] ?? ["Conditions unavailable", "🌤️"];
}
