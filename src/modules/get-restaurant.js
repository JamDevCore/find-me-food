import axios from 'axios';
import getQuery from './get-query';
import refineQuery from './refine-query';
import setLoading from './set-loading';
import { specificFoodOnClick }  from '../index.js';

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

const addResultToPage = (domContainer, address, result) => {
  document.getElementById('searchResult').style.display = 'block';
  document.getElementById('togglePanel').setAttribute("class", "togglePanel");
  const p = document.createElement('p');
  p.setAttribute('class', 'text-center smallText')
  p.setAttribute('id', 'currentLocation')
  p.innerHTML = `Finding food near ${address}`;
  setLoading(domContainer, false);
  const topRestaurantChoice = refineQuery(result);
  const restaurantHeading = document.createElement("h1");
  const text = document.createTextNode(topRestaurantChoice.name);
  restaurantHeading.setAttribute("class", "text-center");
  restaurantHeading.append(text);
  const heading = document.getElementById("restaurant");
  heading.innerHTML = ''
  document.getElementById('toggleAccordion').style.display = 'block';
  heading.append(restaurantHeading)
  heading.append(p)
}

const formatSearch = (position) => {
  const search = {
    queryString: getQuery(),
    lat: position.coords.latitude,
    long: position.coords.longitude,
  }
  return search;
}

const getRestaurant = (position, domContainer) => {
  const { lat, long, distance, queryString } = formatSearch(position)
  specificFoodOnClick();
  document.getElementById('searchResult').style.display = "none";
  console.log('here')
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`)
  .then((res) => {
    console.log(res)
    const address = res.data.results[0].formatted_address;
    if(google) {
      const location = new google.maps.LatLng(lat,long);
      const map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15
      });
      const request = { location, radius: distance, query: queryString };
      const service = new google.maps.places.PlacesService(map);
      service.textSearch(request, (result) => {
      console.log(result)
      addResultToPage(domContainer, address, result);
      });
    }
  })

  .catch(err => console.log('fail'))
}

export default getRestaurant;
