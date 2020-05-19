import { useState, useEffect } from "react";

function Search({ setCurrentLocation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    const res = await fetch(`/api/geocode/address?address=${searchTerm}`);
    const data = await res.json();
    setSearchResults(data.results);
  };

  const handleClick = (result) => {
    setSearchTerm("");
    setSearchResults();
    setCurrentLocation(result);
  };

  useEffect(() => {
    if (!searchTerm) setSearchResults();
  }, [searchTerm]);

  return (
    <>
      <form className="" onSubmit={handleSearch}>
        <div className="flex">
          <input
            className="md:w-64 mr-4 transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 dark:focus:bg-gray-700 dark:bg-gray-800 placeholder-gray-600 rounded-lg bg-gray-200 py-2 px-4 w-full appearance-none leading-normal"
            type="search"
            name="search"
            placeholder="Search for a location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            className="bg-transparent text-yellow-800 dark:text-yellow-500 hover:text-yellow-900 hover:bg-yellow-500 font-bold"
            type="submit"
          />
        </div>
        {searchResults && (
          <ul className="mt-2 absolute bg-white dark:bg-gray-800 rounded shadow-lg">
            {searchResults.map((result) => (
              <li
                key={result.place_id}
                onClick={() => handleClick(result)}
                className="cursor-pointer py-2 px-4 rounded hover:bg-blue-500 hover:text-white"
              >
                {result.formatted_address}
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
}

export default Search;
