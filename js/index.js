var dataEntryInput = document.getElementById("entryData");
var btnData = document.getElementById("buttonData");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var theWeather = [];
var theWeatherLocation;
var tempInC;
var icona;
var iconaText;
async function weatherData(country) {
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=88fb2ba1422a4b2f9ca170656242006 &q=${country}&days=3`);
        var data = await response.json();

        theWeather = data.forecast.forecastday;

        theWeatherLocation = data.location.name;
        tempInC = data.current.temp_c;
        icona = data.current.condition.icon;
        iconaText = data.current.condition.text;

        dispalyData();
    }
    catch (error) {
        console.log(error);
    }
}
function dispalyData() {
    var all = ``;

    // day one info 
    var dayNameOne = days[new Date(theWeather[0].date).getDay()];
    var monthNameOne = months[new Date(theWeather[0].date).getMonth()];
    var dayNo = new Date(theWeather[0].date).getDate();

    // day two info
    var dayNameTWO = days[new Date(theWeather[1].date).getDay()];
    var dayTwoIcona = theWeather[1].day.condition.icon;
    var dayTwomaxtemp_c = theWeather[1].day.maxtemp_c;
    var dayTwomintemp_c = theWeather[1].day.mintemp_c;
    var dayTwoItext = theWeather[1].day.condition.text;

    // daythree info
    var dayNameThree = days[new Date(theWeather[2].date).getDay()];
    var dayThreeIcona = theWeather[2].day.condition.icon;
    var dayThreemaxtemp_c = theWeather[2].day.maxtemp_c;
    var dayThreemintemp_c = theWeather[2].day.mintemp_c;
    var dayThreeItext = theWeather[2].day.condition.text;


    for (var i = 0; i < theWeather.length; i++) {
        all = `
          <div class="col-lg-4  mb-3 ">
                            <div class="card heigth-card  first-card heigth-card">
                                <div class="first-card-head d-flex align-items-center justify-content-between p-3">
                                    <span id="day">${dayNameOne}  </span>
                                    <span id="date">${dayNo}${monthNameOne}</span>
                                </div>
                                <div class="card-body">
                                    <span id="day" class="h5">${theWeatherLocation}</span>
                                    <div class="d-flex flex-wrap align-items-center justify-content-between">

                                    <div class="d-flex  align-items-center justify-content-center position-relative"> 
                                    <h2 id="deg" class="card-title ">${tempInC} </h2>
                                        <h2 class="clis ms-2">o</h2>
                                        <h2 class="ms-5 ">c</h2>
                                        </div>
                                        <img class=" w-25" src="http:${icona}" alt="${iconaText}">
                                    </div>
                                    <p class="text-primary ">${iconaText}</p>

                                    <div class="d-flex align-items-center ">

                                        <img class="imges-small" src="images/ump.png" alt="">
                                        <span class="space-span">20%</span>

                                        <img class="imges-small" src="images/speed.png" alt="">
                                        <span class="space-span">18km/h</span>

                                        <img class="imges-small" src="images/fan.png" alt="">
                                        <span class="space-span">East</span>
                                    </div>
                                </div>
                            </div>
                        </div> 
                       <div class="col-lg-4  mb-3">
                            <div class="card heigth-card second-card text-center  pb-5">
                                <div class="p-3 second-card-head"> <span id="day">${dayNameTWO}</span></div>
                                <div class="card-body ">
                                    <img class=" w-25" src="http:${dayTwoIcona}" alt=${dayTwoItext}>
                                    <div>
                                    </div>
                                     <div class="d-flex  align-items-center justify-content-center position-relative"> 
                                    <h3 id="deg" class="card-title h1 ">${dayTwomaxtemp_c} </h3>
                                        <h3 class="degrees">o</h3>
                                        <h3 class="ms-4">c</h3>
                                        </div>
                                    <span id="deg">${dayTwomintemp_c} </span>


                                    <p class="text-primary">${dayTwoItext}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4  mb-3">
                            <div class="card heigth-card third-card text-center  pb-5">
                                <div class="p-3 third-card-head"> <span id="day">${dayNameThree}</span></div>
                                <div class="card-body ">
                                    <img class=" w-25" src="http:${dayThreeIcona}" alt=${dayThreeItext}>
                                    
                                    <div class="d-flex  align-items-center justify-content-center position-relative"> 
                                    <h3 id="deg" class="card-title h1 ">${dayThreemaxtemp_c} </h3>
                                        <h3 class="degro">o</h3>
                                        <h3 class="ms-4">c</h3>
                                        </div>

                                    <span id="deg">${dayThreemintemp_c}</span>
                                    <p class="text-primary ">${dayThreeItext}</p>







                                </div>
                            </div>
                        </div>  






                                </div>
                            </div>
                        </div>  
            `
    }

    document.getElementById('content').innerHTML = all;
}
btnData.addEventListener('click', function () {
    weatherData(dataEntryInput.value);
})
weatherData("cairo");
// //////////////////////////////////////////////////////////////////////
 var lat;
var lon;
// geographic
/* function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lat = "Latitude: " + position.coords.latitude;
    lon = "Longitude: " + position.coords.longitude;
}
getLocation();
// zip code 
async function getZipCode() {

    var lat = lat;
    var long = lon;

    var respon = await fetch(`http://api.weatherapi.com/v1/forecast.json?latlng=" + lat + "," + long + "&key=88fb2ba1422a4b2f9ca170656242006`);
    var data = await respon.json();
    theWeather = data.forecast.forecastday;
    dispalyData();
}
getZipCode() */