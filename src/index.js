import './style.css';
import {createNewDiv, createMainTemp, displayBackground, cleanData, displayError, addLocation, displayLoading, addLogo, hideLoading} from './manipulateDom'
import {getWeather} from './getData';
import AOS from 'aos';
import 'aos/dist/aos.css';

function populatePage(input){
    let cityToSearch = ''
    if (input === undefined) {
        cityToSearch = 'Buenos Aires';
    }
    else {
        cityToSearch = input;
    }
    getWeather(cityToSearch)
    //getWeather return two objects because it makes two api calls, data[0] is the weather api response and data[1] is the geolocation api response
    .then((data) => {   
                        createMainTemp(data[0]);
                        addLocation(data[1]);
                        createNewDiv(data[0].daily)
                    })
    .catch(error => displayError(error))
    .finally(() => {hideLoading()});
}

function displayNewLocation() {
    let input = document.querySelector('#search').value;
    cleanData();
    populatePage(input);
}

let searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', displayNewLocation);


addLogo();
displayBackground();
displayLoading();
populatePage();


let dayDiv = document.getElementsByClassName('dayDiv');


console.log(dayDiv);
AOS.init();







