import Hourly from "./Hourly";
import Daily from "./Daily";
import Current from "./Current";
import { useUserData, useUpdateUserData, useWeatherData } from "../lib/hooks";
import Loading from "./Loading";

function WeatherDetail({ currentLocation }) {
  const user = useUserData();
  const {
    saveLocation,
    removeLocation,
    updateUserCurrentLocation,
  } = useUpdateUserData(currentLocation);

  const { weather, error } = useWeatherData(currentLocation);

  const { current, hourly, daily, timezone } = weather || {};

  const saved = user.locations
    ? user.locations.some((l) => l.place_id === currentLocation.place_id)
    : false;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2 md:space-y-0 md:flex justify-around items-center rounded px-8 py-6 bg-white dark:bg-gray-800 rounded shadow-lg">
        <p className="text-lg md:text-xl">
          {currentLocation?.formatted_address}
        </p>
        <div className="text-center space-x-4">
          {saved && (
            <>
              <label htmlFor="currentLocation">Current Location</label>
              <input
                type="checkbox"
                name="currentLocation"
                checked={currentLocation.place_id === user.currentLocationId}
                onChange={updateUserCurrentLocation}
              />{" "}
            </>
          )}
          <button
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-700"
            onClick={saved ? removeLocation : saveLocation}
          >
            {saved ? "Remove" : "Save"}
          </button>
        </div>
      </div>
      {weather ? (
        <div className="space-y-8 rounded px-8 py-6 bg-white dark:bg-gray-800 rounded shadow-lg">
          <Current current={current} timezone={timezone} />
          <hr />
          <Hourly hourly={hourly} timezone={timezone} />
          <hr />
          <Daily daily={daily} timezone={timezone} />
        </div>
      ) : (
        <div className="text-center text-3xl py-40 text-yellow-800">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default WeatherDetail;
