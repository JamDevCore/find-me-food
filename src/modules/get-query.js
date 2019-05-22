const getQuery = () => {
  let query = 'restaurants near me';
  console.log('here')
  const collection = document.getElementsByClassName("cuisineCheckbox");
  const checkboxes = Array.prototype.slice.call(collection);
  checkboxes.forEach((checkbox) => {
    console.log(checkbox.value);
    if (checkbox.checked) query = `${checkbox.value} ${query}`;
  });
  return query;
}

export default getQuery;
