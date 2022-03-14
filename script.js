const select = (element) => {
  return document.querySelector(element)
}
const selectAll = (elements) => {
  return document.querySelectorAll(elements)
}

pizzaJson.map((pizza, index) => {

  let pizzaItem = select('.models .pizza-item').cloneNode(true)

  pizzaItem.querySelector('.pizza-item--img img').src = pizza.img
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`
  pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description

  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault()

    select('.pizzaWindowArea').style.opacity = 0
    select('.pizzaWindowArea').style.display = 'flex'
    setTimeout(() => {
      select('.pizzaWindowArea').style.opacity = 1
    }, 200)

  })

  select('.pizza-area').append( pizzaItem )

})