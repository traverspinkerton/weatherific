import { utcToZonedTime, format } from "date-fns-tz";

function Current({ current, timezone }) {
  const { weather, temp, feels_like, humidity, dt } = current;
  const { description, icon } = weather[0] || {};

  return (
    <div className="flex justify-between items-center space-x-16 text-md md:text-xl capitalize">
      <p>{format(utcToZonedTime(dt * 1000, timezone), "h a", timezone)}</p>
      <div className="flex items-center md:text-4xl space-x-4">
        <p>{description}</p>
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
        />
        <p>{Math.round(temp)}°</p>
      </div>
      <div className="items-center space-x-4 hidden md:flex">
        <div>
          <p>Feels Like: {Math.round(feels_like)}°</p>
          <p>Humidity: {Math.round(humidity)}°</p>
        </div>
      </div>
    </div>
  );
}

export default Current;
