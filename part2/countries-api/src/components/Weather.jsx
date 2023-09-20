import { useEffect, useState } from "react";
import weatherService from "../service/weather";

const Weather = ({ countryGeo }) => {
  const KEY = import.meta.env.VITE_SOME_KEY;

  console.log(countryGeo);
  const lat = countryGeo[0];
  const lon = countryGeo[1];
  const [selectedWeather, setSelectedWeather] = useState([]);
  const [apiWeather, setApiWeather] = useState([]);
  console.log(selectedWeather);
  useEffect(() => {
    weatherService
      .getWeather(lat, lon, KEY)
      .then((response) => {
        setSelectedWeather(response);
        setApiWeather(response.weather[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [countryGeo]);

  console.log(apiWeather);

  return (
    <div>
      {selectedWeather && (
        <div>
          {" "}
          <p> Temperature {selectedWeather?.main?.temp}</p>
          <img
            className="weatherIcon"
            src={`https://openweathermap.org/img/wn/${apiWeather.icon}@2x.png`}
          />
          <p>{apiWeather.description}</p>
          <p>Wind {selectedWeather?.wind?.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
