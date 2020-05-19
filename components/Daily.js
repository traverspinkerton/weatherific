import { utcToZonedTime, format } from "date-fns-tz";

function Daily({ daily, timezone }) {
  return (
    <div className="space-y-4 lg:mx-64">
      {daily.slice(1).map(({ dt, weather, temp }) => (
        <div key={dt} className="flex justify-between items-center">
          <p>{format(utcToZonedTime(dt * 1000, timezone), "EEEE", timezone)}</p>
          <div className="flex items-center space-x-8">
            <img
              src={`http://openweathermap.org/img/wn/${weather[0]?.icon}.png`}
              alt={weather[0]?.description}
            />
            <p>
              High: <span className="text-lg">{Math.round(temp.max)}</span>
            </p>
            <p>Low: {Math.round(temp.min)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Daily;
