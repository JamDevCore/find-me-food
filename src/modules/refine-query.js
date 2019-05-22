
const refineQuery = (items) => {

  const sortedItems = items.sort((a,b)=>{
    return b.rating-a.rating;
  });

  const bestItem = sortedItems[0];

  return bestItem;

}

 export default refineQuery;
