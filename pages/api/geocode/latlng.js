export default async (req, res) => {
  const { lat, lng } = req.query;

  const geocodeRes = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_KEY}`
  );

  const geocodeData = await geocodeRes.json();
  res.send(geocodeData);
};
