const weatherDisplay = document.querySelector('.wheater')
const weatherForm = document.querySelector('#weather-form')
const cityInput = document.querySelector('#city-input')

const fetchWeather = async (city) => {
    const url = `\api?q=${city}`

    const res = await fetch(url)
    const data = await res.json()

    if (data.cod === '404') {
        alert('City not found')
        return
    }

    if (data.cod === 401) {
        alert('Invalid API Key')
        return
    }

    const displayData = {
        city: data.name,
        temp: kelvinToCelcius(data.main.temp),
    }

    addWeatherToDOM(displayData)
}


// Add display data to DOM
const addWeatherToDOM = (data) => {
    weatherDisplay.innerHTML = `
      <h1>Weather in ${data.city}</h1>
      <h2>${data.temp} &deg;C</h2>
    `
    cityInput.value = ''
}

// Convert Kelvin to Fahrenheit
const kelvinToFahrenheit = (temp) => {
    return Math.ceil(((temp - 273.15) * 9) / 5 + 32)
}

const kelvinToCelcius = (temp) => {
    const celcius = temp - 273.15
    return celcius.toFixed(2);
}


//Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (cityInput.value === '') {
        alert('Please enter a city')
    } else {
        fetchWeather(cityInput.value)
    }
})


// Initial fetch
// fetchWeather('Buenos Aires')