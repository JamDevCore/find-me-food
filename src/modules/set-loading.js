import loading from '../components/loading';

const setLoading = (loadingContainer, isLoading) => {
  if(isLoading) {
    const loader = document.createElement('div');
    loader.setAttribute('class', 'alignCenter');
    loader.innerHTML = loading;
    loadingContainer.append(loader);
  } else {
    loadingContainer.innerHTML = '';
  }
}

export default setLoading;
