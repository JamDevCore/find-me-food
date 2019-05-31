
const resetSearchStorage = (session) => {
  session.clear();
}

const refineQuery = (items) => {
  let itemCount = 0;
  let sortedItems = items.sort((a,b)=>{
    return b.rating-a.rating;
  });
  const session = window.sessionStorage;
  const previousResults = JSON.parse(session.getItem('find-me-food-results')) || [];
  const filteredItems = [];
  sortedItems.forEach((item) => {
    if(previousResults.indexOf(item.name) === -1) filteredItems.push(item);
  });
  const newResults = previousResults;
  if(filteredItems[itemCount]) newResults.push(filteredItems[itemCount].name);
  session.setItem('find-me-food-results', JSON.stringify(newResults))
  if(!filteredItems[itemCount]) {
    resetSearchStorage(session);
  }
  return filteredItems[itemCount];
  // TODO: Restart search for second page of results when this list of twenty runs out!
}

 export default refineQuery;
