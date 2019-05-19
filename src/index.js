import axios from 'axios';
import form from './components/form';
import loading from './components/loading';
import getQuery from './modules/get-query';
import env from '../env.js';


const addLocation = (position, geolocation) => {
  console.log('here')
  const query = getQuery();
  const distance = 2000;
  const apiKey = env.GOOGLE_MAPS_API_KEY;
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`)
  .then((res) => {
    console.log(res)
    const address = res.data.results[0].formatted_address;
    const p = document.createElement('p');
    p.setAttribute('class', 'text-center')
    p.innerHTML = address;
    geolocation.innerHTML = '';
    geolocation.append(p)
    var map;
    var service;
    var infowindow;
    var request;
    var location = new google.maps.LatLng(lat,long);
    console.log(location)

      map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 15
    });

      request = {
        location: location,
        radius: '500',
        query: 'restaurant'
      };

      service = new google.maps.places.PlacesService(map);
      service.textSearch(request, (success) => console.log(success));
  })
  .catch(err => console.log(err))
}


const initApp = () => {
  const button = document.getElementById("findMeFoodButton");
  button.addEventListener("click", findMeFoodOnClick);
  const geolocation = document.getElementById("geolocation");
  const loader = document.createElement('div');
  loader.setAttribute('class', 'alignCenter');
  loader.innerHTML = loading;
  geolocation.append(loader);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => addLocation(position, geolocation),
        (failure) => { geolocation.innerHTML = form });
      } else {
  console.log('no');
  }
}
initApp();

function findMeFoodOnClick() {
  const button = document.getElementById("findMeFoodButton");
  button.setAttribute("class", "clickedButton");
}
