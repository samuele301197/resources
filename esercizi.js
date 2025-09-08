async function getDashboardData(query) {
  try {
    const citta = await fetch(
      `http://localhost:3333/destinations?search=${query}`
    );
    const meteo = await fetch(`http://localhost:3333/weathers?search=${query}`);
    const aereoporto = await fetch(
      `http://localhost:3333/airports?search=${query}`
    );

    const [cittaRes, meteoRes, aereoportoRes] = await Promise.all([
      citta,
      meteo,
      aereoporto,
    ]);

    if (!cittaRes.ok || !meteoRes.ok || !aereoportoRes.ok) {
      throw new Error("Qualcosa è andato male");
    }

    const [cittaData, meteoData, aereoportoData] = await Promise.all([
      cittaRes.json(),
      meteoRes.json(),
      aereoportoRes.json(),
    ]);

    const result = {
      city: cittaData[0].name,
      country: cittaData[0].country,
      temperature: meteoData[0].temperature,
      weather: meteoData[0].weather_description,
      airport: aereoportoData[0].name,
    };
    console.log(result);
    return result;
  } catch (err) {
    console.error("Errore", err);
  }
}

getDashboardData("Dubai");
