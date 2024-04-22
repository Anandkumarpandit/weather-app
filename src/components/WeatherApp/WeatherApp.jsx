import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from "../Assets/search.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  const api_key = "21ca4b16abe4ec8f52ae215086c568f0";
  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();

      const humidity = document.getElementsByClassName("humidity-percent")[0];
      const wind = document.getElementsByClassName("wind-rate")[0];
      const temperature = document.getElementsByClassName("weather-temp")[0];
      const location = document.getElementsByClassName("weather-location")[0];

      humidity.innerHTML = data.main.humidity + "%";
      wind.innerHTML = Math.floor(data.wind.speed) + " km/h";
      temperature.innerHTML = Math.floor(data.main.temp) + "°C";
      location.innerHTML = data.name;

      const iconCode = data.weather[0].icon;
      if (iconCode === "01d" || iconCode === "01n") {
        setWeatherIcon(cloud_icon);
      } else if (iconCode === "02d" || iconCode === "02n") {
        setWeatherIcon(cloud_icon);
      } else if (iconCode === "03d" || iconCode === "03n" || iconCode === "04d" || iconCode === "04n") {
        setWeatherIcon(drizzle_icon);
      } else if (iconCode === "09d" || iconCode === "09n" || iconCode === "10d" || iconCode === "10n") {
        setWeatherIcon(rain_icon);
      } else if (iconCode === "13d" || iconCode === "13n") {
        setWeatherIcon(snow_icon);
      } else {
        setWeatherIcon(cloud_icon);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className='cityInput' placeholder="search"/>
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt=""/>
        </div>
      </div>  
      <div className='weather-image'>
        <img src={weatherIcon} alt=""/>
      </div>
      <div className='weather-temp'>24°C</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
      <div className='element'>
  <img src={humidity_icon} alt="" className='icon' />
  <div className='data'>
    <div className='humidity-percent'>64%</div>
    <div className='humidity-label'>Humidity</div>
  </div>
</div>
<div className='element'>
  <img src={wind_icon} alt="" className='icon' />
  <div className='data'>
    <div className='wind-rate'>18 km/h</div>
    <div className='wind-label'>Wind Speed</div>
  </div>
</div>

      </div>
    </div>
  );
};

export default WeatherApp;
