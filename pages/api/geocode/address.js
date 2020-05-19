export default async (req, res) => {
  const { address } = req.query;

  const geocodeRes = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_KEY}`
  );

  const geocodeData = await geocodeRes.json();
  res.send(geocodeData);
};
