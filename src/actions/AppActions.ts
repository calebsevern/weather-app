import { Dispatch } from 'redux';
import Constants from './Constants';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// FIXME: In a real application, this would be in a local
// config or passed through an env variable. I'm keeping
// the key in this file to minimize testing friction.
const API_KEY = 'b2da8b77fea49e173e8fc67045167aaf';

const isZip = (str: string) => {
  if (!str || str.length !== 5) return false;
  return !isNaN(parseInt(str));
};

const fetchByCoordinates = (lat: string, lon: string) => async (
  dispatch: Dispatch,
) => {
  const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&APPID=${API_KEY}`);
  const result = await response.json();
  dispatch({
    type: Constants.RECEIVE_WEATHER_DATA,
    data: result,
  });
};

const fetchByCityOrZip = (city: string) => async (
  dispatch: Dispatch,
) => {
  const url = isZip(city)
    ? `${API_URL}?zip=${city},us&APPID=${API_KEY}`
    : `${API_URL}?q=${city},us&APPID=${API_KEY}`;

  const response = await fetch(url);
  const result = await response.json();
  dispatch({
    type: Constants.RECEIVE_WEATHER_DATA,
    data: result,
  });
};

export default {
  fetchByCoordinates,
  fetchByCityOrZip,
};
