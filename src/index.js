import axios from 'axios';
import form from './components/form';
import getQuery from './modules/get-query';
import getRestaurant from './modules/get-restaurant';
import setLoading from './modules/set-loading';


const addGooglePlacesScript = async () => {
  // This was a bit strange, had to set it to await appending to the head to make sure
  // the script loaded before continuing
  const script = document.createElement('script');
  script.type = 'text/javascript'
  script.id = 'gScript';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_KEY}&libraries=places`;
  await document.head.append(script);
  return;
}

const setUpPageButtons = () => {
  const button = document.getElementById("findMeFoodButton");
  button.addEventListener("click", findMeFoodOnClick);
  const accordionHead = document.getElementById("toggleAccordion");
  accordionHead.addEventListener("click", specificFoodOnClick);
}


const initApp = () => {
  addGooglePlacesScript();
  setUpPageButtons();
  const loadingContainer = document.getElementById("location")
  setLoading(loadingContainer, true);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => getRestaurant(position, loadingContainer),
        (failure) => { locationContainer.innerHTML = 'TODO: Add a form' });
      } else {
  console.log('no');
  }
}


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

initApp();
