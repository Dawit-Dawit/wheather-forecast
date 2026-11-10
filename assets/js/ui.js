import { getWeatherDescription } from "./weather.js";

const byId = (id) => document.getElementById(id);

function setHidden(element, isHidden) {
  element.hidden = isHidden;
}

export function showLoading(message = "Finding your forecast…") {
  const panel = byId("status-panel");
  panel.replaceChildren();

  const card = document.createElement("div");
  card.className = "status-card";
  card.setAttribute("role", "status");

  const spinner = document.createElement("span");
  spinner.className = "spinner";
  spinner.setAttribute("aria-hidden", "true");

  const text = document.createElement("p");
  text.textContent = message;
  card.append(spinner, text);
  panel.append(card);
  setHidden(panel, false);
  setHidden(byId("weather-dashboard"), true);
  setHidden(byId("location-picker"), true);
}

export function showWelcome() {
  const panel = byId("status-panel");
  panel.replaceChildren();

  const card = document.createElement("div");
  card.className = "welcome-card";
  const icon = document.createElement("span");
  icon.className = "welcome-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "☼";
  const copy = document.createElement("div");
  const heading = document.createElement("h2");
  heading.textContent = "Your forecast starts here";
  const message = document.createElement("p");
  message.textContent = "Search for a city to see today’s conditions and the five-day outlook.";
  copy.append(heading, message);
  card.append(icon, copy);
  panel.append(card);
  setHidden(panel, false);
  setHidden(byId("weather-dashboard"), true);
  setHidden(byId("location-picker"), true);
}

export function showMessage(title, message, type = "error") {
  const panel = byId("status-panel");
  panel.replaceChildren();

  const card = document.createElement("div");
  card.className = `message-card ${type}`;
  card.setAttribute("role", type === "error" ? "alert" : "status");

  const heading = document.createElement("h2");
  heading.textContent = title;
  const detail = document.createElement("p");
  detail.textContent = message;
  card.append(heading, detail);
  panel.append(card);
  setHidden(panel, false);
  setHidden(byId("weather-dashboard"), true);
  setHidden(byId("location-picker"), true);
}

export function showCityChoices(cities) {
  const picker = byId("location-picker");
  const select = byId("location-select");
  select.replaceChildren();

  cities.forEach((city, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    const region = [city.admin1, city.country].filter(Boolean).join(", ");
    option.textContent = region ? `${city.name}, ${region}` : city.name;
    select.append(option);
  });

  setHidden(byId("status-panel"), true);
  setHidden(byId("weather-dashboard"), true);
  setHidden(picker, false);
  select.focus();
}

function formatValue(value, unit = "") {
  return Number.isFinite(value) ? `${Math.round(value)}${unit}` : "—";
}

function formatDate(dateString, options) {
  if (typeof dateString !== "string") return "—";
  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return "—";
  return new Intl.DateTimeFormat("en", options).format(new Date(year, month - 1, day));
}

function renderForecast(daily) {
  const list = byId("forecast-list");
  list.replaceChildren();
  const days = Array.isArray(daily?.time) ? daily.time : [];

  days.forEach((date, index) => {
    const [description, icon] = getWeatherDescription(daily.weather_code?.[index]);
    const card = document.createElement("article");
    card.className = "forecast-card";
    const day = document.createElement("p");
    day.className = "forecast-day";
    day.textContent = index === 0 ? "Today" : formatDate(date, { weekday: "short" });
    const iconElement = document.createElement("span");
    iconElement.className = "forecast-icon";
    iconElement.setAttribute("aria-label", description);
    iconElement.textContent = icon;
    const condition = document.createElement("p");
    condition.className = "forecast-condition";
    condition.textContent = description;
    const range = document.createElement("p");
    range.className = "forecast-range";
    range.textContent = `${formatValue(daily.temperature_2m_max?.[index], "°")} / ${formatValue(daily.temperature_2m_min?.[index], "°")}`;
    const rain = document.createElement("p");
    rain.className = "forecast-rain";
    rain.textContent = `☂ ${formatValue(daily.precipitation_probability_max?.[index], "%")} rain`;
    card.append(day, iconElement, condition, range, rain);
    list.append(card);
  });

  if (!days.length) {
    const empty = document.createElement("p");
    empty.className = "forecast-empty";
    empty.textContent = "The daily forecast is not available for this location.";
    list.append(empty);
  }
}

export function renderWeather(city, forecast) {
  const current = forecast.current ?? {};
  const [condition, icon] = getWeatherDescription(current.weather_code);
  const dashboard = byId("weather-dashboard");

  byId("city-name").textContent = [city.name, city.country].filter(Boolean).join(", ");
  byId("today-date").textContent = formatDate(current.time?.slice(0, 10), {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  byId("current-condition").textContent = condition;
  byId("current-temperature").textContent = formatValue(current.temperature_2m, "°");
  byId("current-icon").textContent = icon;
  byId("feels-like").textContent = formatValue(current.apparent_temperature, "°");
  byId("humidity").textContent = formatValue(current.relative_humidity_2m, "%");
  byId("wind-speed").textContent = formatValue(current.wind_speed_10m, " km/h");
  renderForecast(forecast.daily);

  setHidden(byId("status-panel"), true);
  setHidden(byId("location-picker"), true);
  setHidden(dashboard, false);
  dashboard.focus({ preventScroll: true });
}
