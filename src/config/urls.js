import AuthKeys from "../constants/AuthKeys";

const BASE_URL = "https://api.weatherapi.com/v1";

export const getApiUrl = (endPoints) => BASE_URL + endPoints;
export const Current_Api =(lat_long)=>getApiUrl(`/current.json?q=${lat_long}&key=${AuthKeys.Weather_API_key}`);
export const Forecast_Api = (lat_long, day)=> getApiUrl(`/forecast.json?q=${lat_long}&days=${day}&key=${AuthKeys.Weather_API_key}`);