export const getUserGPSLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        fetch(`/api/geocode/latlng?lat=${latitude}&lng=${longitude}`)
          .then((res) => res.json())
          .then(({ results }) => resolve(results[0]));
      }
    );
  });
};
