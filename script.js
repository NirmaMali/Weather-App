function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');
  const forecastDiv = document.getElementById('forecastBox');

  if (!location) {
    resultDiv.innerHTML = `<p style="color: red;">Please enter a location.</p>`;
    forecastDiv.innerHTML = '';
    return;
  }

  const apiKey = 'f1484f13d6a44c5cb95113242251406';
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Location not found");
      return response.json();
    })
    .then(data => {
      const current = data.current;
      const locationInfo = data.location;

      resultDiv.innerHTML = `
        <h2>${locationInfo.name}, ${locationInfo.country}</h2>
        <img src="${current.condition.icon}" alt="${current.condition.text}">
        <p><strong>Temperature:</strong> ${current.temp_c}°C / ${current.temp_f}°F</p>
        <p><strong>Condition:</strong> ${current.condition.text}</p>
        <p><strong>Humidity:</strong> ${current.humidity}%</p>
        <p><strong>Wind:</strong> ${current.wind_kph} km/h</p>
      `;

      forecastDiv.innerHTML = `<h3>3-Day Forecast</h3>`;
      data.forecast.forecastday.forEach(day => {
        forecastDiv.innerHTML += `
          <div class="forecast-day">
            <h4>${day.date}</h4>
            <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" />
            <p>${day.day.condition.text}</p>
            <p>🌡 ${day.day.avgtemp_c}°C / ${day.day.avgtemp_f}°F</p>
            <p>☁ Max: ${day.day.maxtemp_c}°C | Min: ${day.day.mintemp_c}°C</p>
          </div>
        `;
      });
    })
    .catch(error => {
      resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
      forecastDiv.innerHTML = '';
    });
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark');
  body.classList.toggle('light');
}
