import React , {useState, useEffect } from "react";

const Weathercard = ({  temp,
      humidity,
      pressure,
      weathermood,
      name,
      speed,
      country,
      sunset, }) => {

        // other method
// const Weathercard = ({ tempInfo }) => {
//   const {
//     temp,
//     humidity,
//     pressure,
//     weathermood,
//     name,
//     speed,
//     country,
//     sunset,
//   } = tempInfo;

const [weatherState, setWeatherState] = useState("")

useEffect(() => {
  if (weathermood) {
    switch (weathermood) {
      case "Clouds":
        setWeatherState("wi-day-cloudy")
        break;
      case "Haze":
        setWeatherState("wi-fog")
        break;
      case "Mist":
        setWeatherState("wi-dust")
        break;
      case "Clear":
        setWeatherState("wi-day-sunny")
        break;
      case "Rain":
        setWeatherState("wi-rain")
        break;
    
      default: 
      setWeatherState("wi-day-sunny")
        break;
    }
    
  }

 
}, [weathermood])

// converting seconds into time
  let sec = sunset;
  let date = new Date(sec * 1000);
  let timestr = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <>
      <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherState}` } />
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            <span>{temp}&deg;</span>
          </div>
          <div className="description">
            <div className="weatherCondition">{weathermood}</div>
            <div className="place">
              {name}, {country}
            </div>
          </div>
        </div>
        <div className="date">{new Date().toLocaleString()}</div>
        {/* our four column section */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"} />
              </p>
              <p className="extra-info-leftside">
                {timestr} <br /> Sunset
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"} />
              </p>
              <p className="extra-info-leftside">
                {humidity} <br /> Humidity
              </p>
            </div>
          </div>
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"} />
              </p>
              <p className="extra-info-leftside">
                {pressure} <br /> Pressure
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"} />
              </p>
              <p className="extra-info-leftside">
                {speed} <br /> Speed
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Weathercard;
