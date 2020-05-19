import { utcToZonedTime, format } from "date-fns-tz";

function Hourly({ hourly, timezone }) {
  return (
    <div className="flex justify-between mx-auto overflow-x-auto max-w-4xl w-full md:w-9/12 space-x-8">
      {hourly?.slice(0, 12).map(({ dt, temp, weather }) => (
        <div key={dt} className="text-center">
          <p>{format(utcToZonedTime(dt * 1000, timezone), "h a", timezone)}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather[0]?.icon}.png`}
            alt={weather[0]?.description}
          />
          <p>{Math.round(temp)}</p>
        </div>
      ))}
    </div>
  );
}

export default Hourly;
