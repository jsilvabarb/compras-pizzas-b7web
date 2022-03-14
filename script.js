const select = (element) => {
  return document.querySelector(element)
}
const selectAll = (elements) => {
  return document.querySelectorAll(elements)
}

pizzaJson.map((pizza, index) => {

  let pizzaItem = select('.models .pizza-item').cloneNode(true)

  select('.pizza-area').append( pizzaItem )

})