async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

async function getDashboardData(query) {
  const citta = fetchJson(`http://localhost:3333/destinations?search=${query}`);
  const meteo = fetchJson(`http://localhost:3333/weathers?search=${query}`);
  const aereoporto = fetchJson(
    `http://localhost:3333/airports?search=${query}`
  );

  const promises = [citta, meteo, aereoporto];
  const [destinations, weather, airports] = await Promise.all(promises);

  return {
    city: destinations[0].name,
    country: destinations[0].country,
    temperature: weather[0].temperature,
    weather: weather[0].weather_description,
    airport: airports[0].name,
  };
}

getDashboardData("london")
  .then((data) => {
    console.log("Dashboard data", data);
    console.log(
      `${data.city} is in ${data.country}. \n` +
        `Today there are ${data.temperature} degrees and the weather is ${data.weather}. \n` +
        `The main airport  is ${data.airport}. \n`
    );
  })
  .catch((error) => console.error(error));
