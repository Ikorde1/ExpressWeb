var cityName = document.getElementById('cityName');
var city_name =document.getElementById('city_name');
var refButton = document.getElementById("submit-Btn");
var temp_status = document.getElementById('temp_status');
var temp_real_val = document.getElementById('temp_real_val');

const datahide = document.querySelector('.middle_layer');

refButton.onclick = async function(event) {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal=== ""){
         city_name.innerText = `Plz write the name before search`;
         datahide.classList.add('data_hide');
    }else{
        try{
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=769c8fe90c2224080e16f7a0b7223c11`;
        const response= await fetch(url);
        const data = await response.json();
        const arrData = [data];
        const tm = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

        city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country} \n ${tm}`;
        temp_real_val.innerText = arrData[0].main.temp;

        //conditions to check sunny or cloudy
        const tempMood = arrData[0].weather[0].main;
            
        if (tempMood==="Clear"){
            temp_status.innerHTML = 
            "<i class='fas fa-sun' style='color: #eccc68;'></i>";
        }else if (tempMood === "Clouds"){
            temp_status.innerHTML = 
            "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
        }else if (tempMood === "Rain" | "snow"){
            temp_status.innerHTML = 
            "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
        }else{
        temp_status.innerHTML =
         "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";

        }

        datahide.classList.remove('data_hide');

    }catch{
        city_name.innerText = `plz enter the city name properly`;
        datahide.classList.add('data_hide');
    }

    }
}     

