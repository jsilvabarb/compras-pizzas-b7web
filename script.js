let modalQuantify = 1
let cart = []
let modalKey = 0

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
    modalKey = key

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

  let size = parseInt(select('.pizzaInfo--size.selected').getAttribute('data-key'))
  let identifier = pizzaJson[modalKey].id+'@'+size
  let key = cart.findIndex((item) => item.identifier == identifier)

  if (key > -1) {

    cart[key].qtd += modalQuantify

  } else {

    cart.push({
      identifier,
      id:pizzaJson[modalKey].id,
      size,
      qtd:modalQuantify
    })

  }

  updateCart()
  closePizzaWindowArea()

})

const updateCart = () => {

  if(cart.length > 0) {

    select('aside').classList.add('show')
    select('.cart').innerHTML = ''

    let subtotal = 0
    let desconto = 0
    let total = 0

    for(let i in cart) {

      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
      subtotal += pizzaItem.price * cart[i].qtd

      let cartItem = select('.models .cart--item').cloneNode(true)
      let pizzaSizeName;

      switch(cart[i].size) {

        case 0:
          pizzaSizeName = 'P'
          break
        case 1:
          pizzaSizeName = 'M'
          break
        case 2:
          pizzaSizeName = 'G'
          break

      }

      let pizzaName = `${pizzaItem.name}, (${pizzaSizeName})`

      cartItem.querySelector('img').src = pizzaItem.img
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd
      cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {

        cart[i].qtd++
        updateCart()

      })
      cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {

        if(cart[i].qtd > 1) {

          cart[i].qtd--

        } else {

          cart.splice(i, 1)

        }

        updateCart()

      })

      select('.cart').append(cartItem)

    }

    desconto = subtotal * 0.1
    total = subtotal - desconto

    select('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
    select('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
    select('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`

  } else {

    select('aside').classList.remove('show')

  }

}
