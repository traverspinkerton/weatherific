export default async (req, res) => {
  const { lat, lng } = req.query;

  const weatherAPIres = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&appid=${process.env.OWM_KEY}&units=imperial`
  );
  const weatherData = await weatherAPIres.json();

  res.json(weatherData);
};
