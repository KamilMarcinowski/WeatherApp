window.addEventListener("DOMContentLoaded", function(){
    const cityText = document.getElementById("city");
    const temperatureText = document.getElementById("temperature");

    const citySelect = document.getElementById("search-city");
    const citySelectButton = document.getElementById("search-button");

    const weatherIcon = document.getElementById("weather-icon");
    const windSpeed = document.getElementById("wind-speed");
    const humidity = document.getElementById("humidity");

    const api = "a9844ff28b049329fcd0a0c0a50f96c0";
    let city = "Olkusz";

    Start();

    function Start()
    {
        if (localStorage.getItem("City") === null)
        {
            city = "Olkusz";
        }
        else
        {
            city = localStorage.getItem("City");
        }

        console.log(city);
        GetWeatherData();
    }

    function GetWeatherData()
    {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log("Succesful connect api");

            cityText.innerText = data.name;
            temperatureText.innerText = data.main.temp.toFixed("0") + "°C";

            switch (data.weather[0].main)
            {
                case "Clear":
                    weatherIcon.src = "assets/sun.png";
                    break;
                case "Clouds":
                    weatherIcon.src = "assets/Cloudy.png";
                    break;
                case "Rain":
                    weatherIcon.src = "assets/CloudyRain.png";
                    break;
            }

            windSpeed.innerText = data.wind.speed + "Km/h \n wind speed";
            humidity.innerText = data.main.humidity + "% \n humidity";
        })
        .catch(error => {
            console.error("error", error);
            weatherIcon.src = "assets/browser.png";
        })
    }

    function SelectCity()
    {
        city = citySelect.value;
        localStorage.setItem("City", city);
        window.location.reload();
    }

    citySelectButton.addEventListener("click", SelectCity);
})
