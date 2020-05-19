import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useAuth } from "react-use-auth";

import Nav from "../components/Nav";
import Search from "../components/Search";
import WeatherDetail from "../components/WeatherDetail";
import SavedLocations from "../components/SavedLocations";
import { getUserGPSLocation } from "../lib/geocodeApi";

export default function WeatherPage() {
  const [currentLocation, setCurrentLocation] = useState();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) login();

    getUserGPSLocation().then((userGPSLocation) => {
      if (!currentLocation) {
        setCurrentLocation(userGPSLocation);
      }
    });
  }, []);

  return (
    <div className="container mx-auto">
      <Head>
        <title>Weatherific</title>
      </Head>
      <Nav />
      <div className="">
        <div className="mx-4 md:mx-0 space-y-4 md:space-y-0 mb-4 md:flex justify-between items-center">
          <Search setCurrentLocation={setCurrentLocation} />
          <SavedLocations setCurrentLocation={setCurrentLocation} />
        </div>
        {!currentLocation ? (
          <p className="text-center text-3xl text-yellow-800 dark:text-yellow-500 font-bold">
            Select a Saved Location or Search for a new one
          </p>
        ) : (
          <WeatherDetail currentLocation={currentLocation} />
        )}
      </div>
    </div>
  );
}
