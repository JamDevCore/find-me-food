import axios from 'axios';
import form from './components/form';
import loading from './components/loading';
import getQuery from './modules/get-query';
import refineQuery from './modules/refine-query'

const addLocation = (position, geolocation) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const query = getQuery();
  const distance = 2000;
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`)
  .then((res) => {
    console.log(res)
    const address = res.data.results[0].formatted_address;
    const p = document.createElement('p');
    p.setAttribute('class', 'text-center smallText')
    p.innerHTML = `Finding food near ${address}`;
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
      service.textSearch(request, (result) => {
        const bestItem = refineQuery(result);
        console.log(bestItem);
        const bestItemHtml = document.createElement("h1");
        const text = document.createTextNode(bestItem.name);
        bestItemHtml.setAttribute("class", "text-center");
        bestItemHtml.append(text);
        document.getElementById("restaurant").append(bestItemHtml);
      });
  })
  .catch(err => console.log(err))
}


const initApp = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript'
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_KEY}&libraries=places`;
  document.head.append(script);
  const button = document.getElementById("findMeFoodButton");
  button.addEventListener("click", findMeFoodOnClick);

  // Here you were calling get id when there was no id, you had used a class in the index.html
  const accordionHead = document.getElementById("toggleAccordion");
  accordionHead.addEventListener("click", specificFoodOnClick);

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

function specificFoodOnClick() {
  var panel = document.getElementById("togglePanel");
  var classCheck = panel.getAttribute("class");
  if (classCheck === "togglePanel") {
    panel.setAttribute("class", "openAccordion");
  } else {
    panel.setAttribute("class", "togglePanel");
  }
}
