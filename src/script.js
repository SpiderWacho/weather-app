async function getWeather() {
   let rawData = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Argentina&APPID=f9a4a03a77656330115b00b33d0c13c2&units=metric ', {mode: 'cors'});
   let data = await rawData.json();
   manipulateDom.createNewDiv(data);
}

const manipulateDom = (() => {
    const rowIcon = document.querySelector('.rowIcon');
    
    function displayBackground() {
        const dateObj = new Date();
        const timeOfVisit = dateObj.getHours();
    
        if (timeOfVisit < 7 || timeOfVisit > 18  ) {
            document.body.style.backgroundImage = "url(./images/night.jpg)"
        }
        else {
            document.body.style.backgroundImage = "url(./images/dayBg.jpg)"
        }
    }    

    function createNewDiv(data) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('dayDiv');
        let newP = document.createElement('p');
        newP.classList.add('climate-day-text');
        newP.textContent = `${data.main.temp}°`;
        
        
        let newImg = document.createElement('img');
        newImg.classList.add('climate-logo');
        newImg.setAttribute('src', 'images/sun.png');

        newDiv.append(newP);
        newDiv.append(newImg);
        rowIcon.append(newDiv);
        
    
    }

    
    return {createNewDiv, displayBackground};
})();

let data = getWeather();
console.log(data);
manipulateDom.displayBackground();



