//   We need to fetch the data from geoCode to get the latitude and longitude of a city that we input
// We need to fetch the data from openWeather to get da current weather data
// We need to update the html with javascript to display the weather

// Fetching the data from geoCode

async function getLatLong(cityName) {
  const URI_ENCODED_PLACENAME = encodeURIComponent(cityName);
  const KEY = "6dc274178e54402da3d4904ca323087a";
  const geoAPI = `https://api.opencagedata.com/geocode/v1/json?q=${URI_ENCODED_PLACENAME}&key=${KEY}&units=metric`;

  try {
    const response = await fetch(geoAPI);
    const data = await response.json();
    if (response.ok) {
      const lng = data.results[0].geometry.lng;
      const lat = data.results[0].geometry.lat;

      return { latitude: lat, longitude: lng };
    } else {
      console.error("Error", data.message || "Unknown Error");
    }
  } catch (error) {
    console.log(error);
  }
}

async function getWeather(latitude, longitude) {
  const KEY = "0d667bae7d35f45367b82557da30e565";
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}&units=metric`;

  try {
    const response = await fetch(weatherAPI);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error("Error", data.message || "Unknown Error");
    }
  } catch (error) {
    console.log(error);
  }
}

const city = document.querySelector("#city_name");
const search = document.querySelector("#search-icon");

const cityDisplay = document.querySelector(".city");
const tempDisplay = document.querySelector(".temp");
const windDisplay = document.querySelector(".wind");
const humidDisplay = document.querySelector(".humid");

search.addEventListener("click", async () => {
  let cityInput = city.value;

  const coordinates = await getLatLong(cityInput);

  if (coordinates) {
    const weatherData = await getWeather(
      coordinates.latitude,
      coordinates.longitude
    );

    if (weatherData) {
      cityDisplay.innerHTML = `City: ${cityInput}, ${weatherData.sys.country}`;
      tempDisplay.innerHTML = `Temp: ${weatherData.main.temp}`;
      windDisplay.innerHTML = `Wind speed: ${weatherData.wind.speed}`;
      humidDisplay.innerHTML = `Humidity: ${weatherData.main.humidity}`;
    }
  }
});
