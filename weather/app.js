const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
      default: '201308'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.forecast.io/forecast/750cba0cc6a70762ed42dc2825f0e519/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  var todaysLow =response.data.daily.data[0].temperatureMin ;
  var todaysHigh = response.data.daily.data[0].temperatureMax ;
  var windSpeed = response.data.daily.data[0].windSpeed;
  var humidity = response.data.daily.data;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
  console.log(`Predicted  : \n Highest Temp : ${todaysHigh},\n Lowest Temp: ${todaysLow}, \n Wind Speed ${windSpeed} .`);
  //console.log(`Summary : Humidity : ${humidity}. `)
  var a= [];
  humidity.forEach(function (elem,index){
    a.push(elem.humidity); 
    
 })
 

 console.log(`Humidity : \n Highest ${ Math.max.apply(null, a ) },\n Lowest: ${Math.min.apply(null,a )} .`);
 
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
