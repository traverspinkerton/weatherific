import useSWR, { mutate } from "swr";
import { useAuth } from "react-use-auth";

import { getUserMetadata, patchUserMetadata } from "./userApi";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useUserData = () => {
  const { authResult } = useAuth();

  const { data: user, error } = useSWR(
    () =>
      authResult ? [authResult.idTokenPayload.sub, authResult.idToken] : null,
    getUserMetadata,
    { revalidateOnFocus: false, revalidateOnMount: false }
  );

  const { locations, currentLocationId } = user?.user_metadata || {};

  return { locations, currentLocationId, error };
};

export const useUpdateUserData = (currentLocation) => {
  const { authResult } = useAuth();
  const user = useUserData();

  const updateUserMetaData = (userMetadata) => {
    mutate(
      [authResult.idTokenPayload.sub, authResult.idToken],
      { user_metadata: { ...user, ...userMetadata } },
      false
    );

    mutate(
      [authResult.idTokenPayload.sub, authResult.idToken],
      patchUserMetadata(
        authResult.idTokenPayload.sub,
        authResult.idToken,
        userMetadata
      )
    );
  };

  const saveLocation = () => {
    const newLocations = [currentLocation, ...user.locations];
    updateUserMetaData({ locations: newLocations });
  };

  const removeLocation = () => {
    const newLocations = user.locations.filter(
      (l) => l.place_id !== currentLocation.place_id
    );

    const currentLocationId =
      currentLocation.place_id === user.currentLocationId
        ? ""
        : user.currentLocationId;

    updateUserMetaData({ locations: newLocations, currentLocationId });
  };

  const updateUserCurrentLocation = () => {
    const newUserCurrentLocationId =
      currentLocation.place_id === user.currentLocationId
        ? ""
        : currentLocation.place_id;

    updateUserMetaData({
      currentLocationId: newUserCurrentLocationId,
    });
  };

  return { saveLocation, removeLocation, updateUserCurrentLocation };
};

export const useWeatherData = (location) => {
  const {
    geometry: {
      location: { lat, lng },
    },
  } = location;

  const { data: weather, error } = useSWR(
    `/api/weather?lat=${lat}&lng=${lng}`,
    fetcher
  );

  return { weather, error };
};
