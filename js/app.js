const btnSearch = document.getElementById("btnSearch")
const inputSearch = document.getElementById("inputSearch")

const url = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = "" //Borré la clave por cuestiones de seguridad.

btnSearch.addEventListener("click", (e) => {
    e.preventDefault()
    const city = inputSearch.value.trim()

    if (city) {
        fetch(`${url}?q=${city}&appid=${apiKey}`)
        .then(response =>  response.json())
        .then(response => showWeatherData(response))
        .catch(error => {
            weatherData.innerHTML = "" 
            const errorResponse = document.createElement("p")
            errorResponse.classList.add("text-center", "bg-danger", "text-white", "p-2", "rounded")
            errorResponse.textContent = "Ciudad no encontrada"

            weatherData.appendChild(errorResponse)
        })
    }
})

inputSearch.addEventListener("input", () => {
    const city = inputSearch.value.trim()
    const weatherData = document.getElementById("weatherData")

    if (city === "") {
        weatherData.innerHTML = `
        <div class="d-flex justify-content-center mb-3">
            <img class="main-img" src="./img/main-icon.svg" alt="imagen principal de la app">
        </div>
        `
    }
})

function showWeatherData(response) {
    const weatherData = document.getElementById("weatherData")
    weatherData.innerHTML = ""

    const cityName = response.name
    const temp = response.main.temp
    const feelsLike = response.main.feels_like
    const tempMax = response.main.temp_max
    const tempMin = response.main.temp_min
    const humidity = response.main.humidity

    const name = document.createElement("h2")
    name.classList.add("text-center", "text-light")
    name.setAttribute("data-aos","fade-left")
    name.textContent = cityName

    const temperature = document.createElement("p")
    temperature.classList.add("text-center", "text-light", "weatherNum")
    temperature.setAttribute("data-aos","fade-left")
    temperature.textContent = `${Math.round(temp - 273.15)} °C`

    const feels_Like = document.createElement("p")
    feels_Like.classList.add("text-light")
    feels_Like.setAttribute("data-aos","fade-right")
    feels_Like.innerHTML = `<i class="bi bi-caret-right-fill"></i> Sensación térmica: ${Math.round(feelsLike - 273.15)} °C`

    const temperatureMax = document.createElement("p")
    temperatureMax.classList.add("text-light")
    temperatureMax.setAttribute("data-aos","fade-right")
    temperatureMax.innerHTML = `<i class="bi bi-caret-right-fill"></i> Temperatura máxima: ${Math.round(tempMax - 273.15)} °C`

    const temperatureMin = document.createElement("p")
    temperatureMin.classList.add("text-light")
    temperatureMin.setAttribute("data-aos","fade-right")
    temperatureMin.innerHTML = `<i class="bi bi-caret-right-fill"></i> Temperatura mínima: ${Math.round(tempMin - 273.15)} °C`
    
    const humidityValue = document.createElement("p")
    humidityValue.classList.add("text-light")
    humidityValue.setAttribute("data-aos","fade-right")
    humidityValue.innerHTML =`<i class="bi bi-caret-right-fill"></i> Humedad: ${humidity}%`

    weatherData.appendChild(name)
    weatherData.appendChild(temperature)
    weatherData.appendChild(feels_Like)
    weatherData.appendChild(temperatureMax)
    weatherData.appendChild(temperatureMin)
    weatherData.appendChild(humidityValue)
}