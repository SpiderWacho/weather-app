async function getLocation(input) {
    try {
          let rawLocation = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=f9a4a03a77656330115b00b33d0c13c2&units=metric`, {mode: 'cors'});
          let location = await rawLocation.json();
          return location;        
        }
    catch(error) {
        displayError(error);        
        throw new Error(error);
    }
}

async function getWeather(input) {
    try {   
        let searchLocation = '';
        if (input === undefined) {
            searchLocation = 'Buenos Aires';
        }
        else {
            searchLocation = input;
        }
        console.log(searchLocation);
        let location = await getLocation(searchLocation);

        let lat = location[0].lat;
        let lon = location[0].lon;
        let rawData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=f9a4a03a77656330115b00b33d0c13c2&units=metric`, {mode: 'cors'});
        let data = await rawData.json();
        if (document.querySelector('.error') != undefined) {
            document.querySelector('.error').style.display = 'none';
        }
        return [data, location];            
    }
    catch(error) { 
        throw new Error(error);
    }
}

export {getWeather}