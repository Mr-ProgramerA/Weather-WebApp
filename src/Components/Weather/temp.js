import React, { useState, useEffect } from "react";
import "./style.css";
import Weathercard from "./weathercard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("ulhasnagar");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = "Your weather api here"
      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      // console.log(data);
      // console.log(name);
      // console.log(humidity);
      // console.log(pressure);
      // console.log(speed);
      // console.log(country);
      // console.log(sunset);
      // console.log(temp);
      // console.log(weathermood);

      const myMewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myMewWeatherInfo);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="City Name"
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

     <Weathercard {...tempInfo}/>
    </>
  );
};

export default Temp;
