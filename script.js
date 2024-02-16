const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '9d1bb9506ff6b4eed8b75615c1ef117c';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});

function sendSMS(city, temperature, description) {
    const phoneNumber = '+94759595187'; // Replace with your phone number
    const infobipAPIKey = '9f792b8cbe49ea8c492f42e344e531d9-da921fb7-6d96-4a30-89d8-c13a98e6301a';

    const message = `Weather update for ${city}: ${temperature}°C, ${description}`;

    fetch('https://vvwkxp.api.infobip.com/sms/2/text/single', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'App ' + infobipAPIKey
        },
        body: JSON.stringify({
            from: 'Alert',
            to: phoneNumber,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message sent successfully!', data);
    })
    .catch(error => {
        console.error('Error sending SMS:', error);
    });
}
