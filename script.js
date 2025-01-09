document.addEventListener("DOMContentLoaded", () =>{
    const cityInput= document.getElementById("city-input");
    const getWeartherBtn = document.getElementById("get-weather-btn");
    const WeatherInfo= document.getElementById("weather-info");
    const citynameDisplay= document.getElementById("City-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descroptionDisplay= document.getElementById("description");
    const errorMessage= document.getElementById("error-message");

    const API_KEY = "f1854754599d9dcaeea4b3d74ce7f4c9";

    getWeartherBtn.addEventListener('click',async () =>{
        const city = cityInput.value.trim();
        if(!city)
            return;

        // it may throw an error
        //server/database is always in another continent

        try{
            const weatherData= await fetchWeatherData(city)
            displayWeatherData(weatherData);
        } catch (error){
            showError();
        }
    })

    async function fetchWeatherData(city){
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE",response);

        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(Data){
        console.log(Data);
        const {name,main,weather} = Data;
        citynameDisplay.textContent = name;
         temperatureDisplay.textContent = `Temperature: ${main.temp}`;
         descroptionDisplay.textContent = `Weather : ${weather[0].description}`;

        //unlock the weather info
        WeatherInfo.classList.remove('hidden');
        errorMessage.classList.add("hidden");
       
        }

    function showError(){
        WeatherInfo.classList.remove('hidden');
        errorMessage.classList.add("hidden");
    }

});