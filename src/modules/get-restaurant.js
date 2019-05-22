import axios from 'axios';
import getQuery from './get-query';
import refineQuery from './refine-query';
import setLoading from './set-loading';

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

const addResultToPage = (domContainer, address, result) => {
  const p = document.createElement('p');
  p.setAttribute('class', 'text-center smallText')
  p.innerHTML = `Finding food near ${address}`;
  setLoading(domContainer, false);
  domContainer.append(p)
  const topRestaurantChoice = refineQuery(result);
  const restaurantHeading = document.createElement("h1");
  const text = document.createTextNode(topRestaurantChoice.name);
  restaurantHeading.setAttribute("class", "text-center");
  restaurantHeading.append(text);
  const heading = document.getElementById("restaurant");
  heading.innerHTML = ''
  heading.append(restaurantHeading)
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
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`)
  .then((res) => {
    console.log(res)
    const address = res.data.results[0].formatted_address;
    if(document.getElementById('gScript') && google) {
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

  .catch(err => console.log(err))
}

export default getRestaurant;
