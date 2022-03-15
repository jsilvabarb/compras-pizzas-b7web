let modalQuantify = 1

const select = (element) => {
  return document.querySelector(element)
}
const selectAll = (elements) => {
  return document.querySelectorAll(elements)
}

pizzaJson.map((pizza, index) => {

  let pizzaItem = select('.models .pizza-item').cloneNode(true)

  pizzaItem.setAttribute('data-key', index);
  pizzaItem.querySelector('.pizza-item--img img').src = pizza.img
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`
  pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description

  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault()

    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    modalQuantify = 1

    select('.pizzaBig img').src = pizzaJson[key].img
    select('.pizzaInfo h1').innerHTML = pizzaJson[key].name
    select('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
    select('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
    select('.pizzaInfo--size.selected').classList.remove('selected')
    
    selectAll('.pizzaInfo--size').forEach((size, index) => {
      
      if(index == 2) {
        size.classList.add('selected')
      }

      select('.pizzaInfo--qt').innerHTML = modalQuantify

      size.querySelector('span').innerHTML = pizzaJson[key].sizes[index]

    })

    select('.pizzaWindowArea').style.opacity = 0
    select('.pizzaWindowArea').style.display = 'flex'
    setTimeout(() => {
      select('.pizzaWindowArea').style.opacity = 1
    }, 200)

  })

  select('.pizza-area').append( pizzaItem )

})

const closePizzaWindowArea = () => {
  select('.pizzaWindowArea').style.opacity = 0
  setTimeout(() => {
    select('.pizzaWindowArea').style.display = 'none'
  }, 500)
}

selectAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
  item.addEventListener('click', closePizzaWindowArea)
})

select('.pizzaInfo--qtmenos').addEventListener('click', () => {

  if(modalQuantify > 1) {
    modalQuantify--;
  }
  select('.pizzaInfo--qt').innerHTML = modalQuantify

})

select('.pizzaInfo--qtmais').addEventListener('click', () => {
  modalQuantify++;
  select('.pizzaInfo--qt').innerHTML = modalQuantify

})

selectAll('.pizzaInfo--size').forEach((size, index) => {

  size.addEventListener('click', (e) => {
    select('.pizzaInfo--size.selected').classList.remove('selected')
    size.classList.add('selected')
  })

})

select('.pizzaInfo--addButton').addEventListener('click', () => {

})