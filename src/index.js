import './style.css';
import {createNewDiv, createMainTemp, displayBackground, cleanData, displayError, addLocation, displayLoading, addLogo} from './manipulateDom'
import {getWeather} from './getData';


addLogo();

function populatePage(input){
    displayLoading();
    let cityToSearch = ''
    if (input === undefined) {
        cityToSearch = 'Buenos Aires';
    }
    else {
        cityToSearch = input;
    }
    getWeather(cityToSearch)
    .then((data) => {   
                        createMainTemp(data[0]);
                        addLocation(data[1]);
                        createNewDiv(data[0].daily)
                    })
    .finally(() => { const loader = document.querySelector('.lds-roller');
        loader.style.display = "none"});
}

let searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', displayNewLocation);

function displayNewLocation() {
    let input = document.querySelector('#search').value;
    cleanData();
    populatePage(input);
}

displayBackground();
populatePage();
