
const refineQuery = (items) => {

  const sortedItems = items.sort((a,b)=>{
    return b.rating-a.rating;
  });

<<<<<<< HEAD

  //look for radio button choice here.

  //TODO: need to check how it returns the restaurant type (chines indian etc. for sortedItems[x].type)
  var y = 0;
  var radioButton;
  for (radioButton in document.getElementsByClassName("cuisineCheckbox")) {
    if (radioButton.checked === true) {
      var type = radioButton.value
      for (x = 0; x < sortedItems.length; x++) {
        if (sortedItems[x].type === radiobutton) {
          y = x;
          break;
        }
      }
    }
  }


  const bestItem = sortedItems[y];

=======
>>>>>>> master

  // //look for radio button choice here.
  //
  // //TODO: need to check how it returns the restaurant type (chines indian etc. for sortedItems[x].type)
  // var y = 0;
  // var radioButton;
  // for (radioButton in document.getElementsByClassName("cuisineCheckbox")) {
  //   if (radioButton.checked === true) {
  //     var type = radioButton.value
  //     for (x = 0; x < sortedItems.length; x++) {
  //       if (sortedItems[x].type === radiobutton) {
  //         y = x;
  //         break;
  //       }
  //     }
  //   }
  // }


  // const bestItem = sortedItems[y];


  return sortedItems[0];

}

 export default refineQuery;
