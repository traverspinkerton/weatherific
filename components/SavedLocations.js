import { useUserData } from "../lib/hooks";
import Loading from "./Loading";

function SavedLocations({ setCurrentLocation }) {
  const { locations, currentLocationId } = useUserData();

  if (!locations)
    return (
      <div className="flex items-center px-10 rounded bg-gray-200 text-gray-700">
        <Loading />
      </div>
    );

  return (
    <>
      <select
        name="savedLocations"
        value=""
        onChange={(e) =>
          setCurrentLocation(
            locations.find((l) => l.place_id === e.target.value)
          )
        }
        className="appearance-none cursor-pointer py-2 px-4 rounded hover:bg-blue-500 hover:text-white font-bold bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
      >
        <option value="">Saved Locations</option>
        {locations
          .sort((a, b) => (a.place_id === currentLocationId ? -1 : 1))
          .map((location) => (
            <option key={location.place_id} value={location.place_id}>
              {location.address_components[0]?.long_name}
            </option>
          ))}
      </select>
    </>
  );
}

export default SavedLocations;
