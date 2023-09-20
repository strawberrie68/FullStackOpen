import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const unitURL = "&units=metric";

const getWeather = (lat, lon, KEY) => {
  const request = axios.get(
    `${baseUrl}?lat=${lat}&lon=${lon}&appid=${KEY}${unitURL}`
  );
  return request.then((response) => response.data);
};

export default { getWeather };
