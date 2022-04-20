import './style.css';
import dayBg from './images/dayBg.jpg';
import nightBg from './images/night.jpg';
import clearSky from './images/sun.png';
import thunder from './images/thunder.png'
import snow from './images/snow.png';
import rain from './images/rain.png';
import cloud from './images/cloud.png';
import logoText from './images/logo_prev_ui.png'
import {format} from 'date-fns';
import es from 'date-fns/locale/es'


async function getWeather(input) {
    try {
    let rawLocation = '';
    if (input != undefined) {      
        rawLocation = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=f9a4a03a77656330115b00b33d0c13c2&units=metric`, {mode: 'cors'});
    }
    else {
        rawLocation = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=Buenos+Aires&limit=5&appid=f9a4a03a77656330115b00b33d0c13c2&units=metric', {mode: 'cors'});
    }
        let location = await rawLocation.json();
        let lat = location[0].lat;
        let lon = location[0].lon;
        let rawData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=f9a4a03a77656330115b00b33d0c13c2&units=metric`, {mode: 'cors'});
        let data = await rawData.json();
        if (document.querySelector('.error') != undefined) {
            document.querySelector('.error').style.display = 'none';
        }
        console.log(data);
        return data;
    }
    catch(error) {
        manipulateDom.displayError(error);        
        throw new Error(error);
    }
}

const manipulateDom = (() => {

    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
      }

    const dataRow = document.querySelector('.dataRow');

    const logoContainer = document.querySelector('.logoContainer');
    const logo = new Image();
    logo.classList.add('logo');
    logo.src = logoText;
    logoContainer.append(logo);
    
    function displayBackground() {
        const dateObj = new Date();
        const timeOfVisit = dateObj.getHours();
    
        if (timeOfVisit < 7 || timeOfVisit > 18  ) {
            document.body.style.backgroundImage = `url(${nightBg})`;
            console.log(nightBg);
        }
        else {
            document.body.style.backgroundImage = `url(${dayBg}`;
        }
    }    

    function createMainTemp(data) {
        let container = document.querySelector('.container-main')
        //Multiply number by 1000 to get correct date
        console.log(data.current.dt);
        let rawDate = new Date(data.current.dt * 1000);
        let date = format(rawDate, 'PPP');

        //Get and display min and max temp
        let tempMax = document.createElement('p');
        tempMax.classList.add('main-climate-day-text-tempMax');
        tempMax.textContent = `Max: ${Math.round(data.daily[0].temp.max)}°`;
        let tempMin = document.createElement('p');
        tempMin.classList.add('main-climate-day-text-tempMin');
        tempMin.textContent = `Min: ${Math.round(data.daily[0].temp.min)}°`;
        
        //Get date
        let newPDate = document.createElement('p');
        newPDate.classList.add('main-climate-day-text-date');
        console.log(date);
        newPDate.textContent = `${format(new Date(data.current.dt * 1000), 'PPP', {locale: es})}`;

        //Get current temp
        let feelsLike = document.createElement('p');
        feelsLike.classList.add('feelsLike');
        feelsLike.textContent = `${Math.round(data.current.feels_like)}° C`;
        
        //Get and display sunrise, sunset hours
        let sunrise = document.createElement('p');
        let sunset = document.createElement('p');
        sunrise.classList.add('sunrise');
        sunset.classList.add('sunset');
        let sunriseHour =  format(new Date(data.current.sunrise * 1000), 'p');
        sunrise.textContent = `Salida del sol: ${sunriseHour}`;
        let sunsetHour =  format(new Date(data.current.sunset * 1000), 'p');
        sunset.textContent = `Puesta del sol: ${sunsetHour}`;
        
        //Determine img according to weather
        const climateIcon = new Image();
        if (data.current.weather[0].id >= 200 && data.current.weather[0].id < 300) {
            climateIcon.src = thunder;
        }
        else if (data.current.weather[0].id >= 500 && data.current.weather[0].id < 600) {
            climateIcon.src = rain;
        }
        else if (data.current.weather[0].id >= 600 && data.current.weather[0].id < 700) {
            climateIcon.src = snow;
        }
        else if (data.current.weather[0].id === 800) {
            climateIcon.src = clearSky;
        }
        else if (data.current.weather[0].id > 800) {
            climateIcon.src = cloud;
        }
        climateIcon.classList.add('main-climate-logo');


        let weather = document.createElement('p');
        weather.classList.add('main-weather');
        weather.textContent = `${toTitleCase(data.current.weather[0].description)}`

        container.append(tempMax);
        container.append(tempMin);
        container.append(sunrise);
        container.append(sunset);
        container.append(newPDate);
        container.append(climateIcon);
        container.append(weather);
        container.append(feelsLike);
        //Modify style with js to not see the border lines while loading data
        container.style.border = '1px solid grey';
        container.style.boxShadow = '0px 1px 5px .3px grey';
        dataRow.append(container);   
    }

    function createNewDiv(data) {
        const containerDiv = document.querySelector('.container-daily');
        for (let i = 1; i < 8; i++) {

            let rawDate = new Date(data[i].dt * 1000);
            let date = format(rawDate, 'PPP', {locale: es});
            
            let newDiv = document.createElement('div');
            newDiv.classList.add('dayDiv');
            
            let tempMax = document.createElement('p');
            tempMax.classList.add('climate-day-text-temp');
            tempMax.textContent = `Max: ${Math.round(data[i].temp.max)}°`;
            let tempMin = document.createElement('p');
            tempMin.classList.add('climate-day-text-tempMin');
            tempMin.textContent = `Min: ${Math.round(data[i].temp.min)}°`;

            let newPDate = document.createElement('p');
            newPDate.classList.add('climate-day-text-date')
            newPDate.textContent = `${date}`;

            let weather = document.createElement('p');
            weather.classList.add('weather');
            weather.textContent = `${toTitleCase(data[i].weather[0].description)}`
            
            const climateIcon = new Image();
            if (data[i].weather[0].id > 200 && data[i].weather[0].id < 300) {
                climateIcon.src = thunder;
            }
            else if (data[i].weather[0].id >= 500 && data[i].weather[0].id < 600) {
                climateIcon.src = rain;
            }
            else if (data[i].weather[0].id >= 600 && data[i].weather[0].id < 700) {
                climateIcon.src = snow;
            }
            else if (data[i].weather[0].id === 800) {
                climateIcon.src = clearSky;
            }
            else if (data[i].weather[0].id > 800) {
                climateIcon.src = cloud;
            }
            climateIcon.classList.add('climate-logo');

            newDiv.append(tempMax);
            newDiv.append(tempMin);
            newDiv.append(newPDate);
            newDiv.append(weather);
            newDiv.append(climateIcon);
            containerDiv.append(newDiv);
        } 
    }

    function cleanData() {
        const containerDaily = document.querySelector('.container-daily');
        const containerMain = document.querySelector('.container-main')
        containerDaily.textContent = ''
        containerMain.textContent = '';
    }

    function displayError(msg) {
        const container = document.querySelector('.container-main');
        let newError = document.createElement('p');
        newError.classList.add('error');
        newError.textContent = "Location not correct";
        container.append(newError);
    }
    
    
    return {createNewDiv, createMainTemp, displayBackground, cleanData, displayError};
})();

manipulateDom.displayBackground();

function searchCity() {
    let input = document.querySelector('#search').value;
    manipulateDom.cleanData();
    populatePage(input);
    

}


function displayLoading() {
    const loader = document.querySelector('.lds-roller');
    loader.style.display = 'block'; 
}

function populatePage(input){
    
    displayLoading();
    getWeather(input)
    .then((data) => {manipulateDom.createNewDiv(data.daily)
                            return data})
    .then((data) => manipulateDom.createMainTemp(data))
    .finally(() => { const loader = document.querySelector('.lds-roller');
        loader.style.display = "none"});
}

let searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', searchCity);

populatePage();
