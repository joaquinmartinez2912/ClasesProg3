// Simulación de proceso de compra:
// Escribe un programa donde el usuario tenga una lista de productos,
// cada uno con un botón que diga “Comprar” que al presionarlo dispare una función llamada
//  procesoDeCompra que tome el producto seleccionado como argumento y devuelva una promesa.
//   Esta promesa debe simular un proceso de compra, que incluya verificar la disponibilidad del producto,
//    calcular el precio total y confirmar la compra después de un breve período de espera,
//    todos estos datos los tengo que ver en una alerta.

const listaProductos = document.getElementById('listaProductos')

// Para cargar las tareas que estan guardadas en localStorage.
const cargarTareas = () => {
  const listaOriginal = [
    { id: 1, nombre: 'Laptop', precio: 1200, stock: 10 },
    { id: 2, nombre: 'Teléfono móvil', precio: 800, stock: 0 },
    { id: 3, nombre: 'Tablet', precio: 500, stock: 15 },
    { id: 4, nombre: 'Smartwatch', precio: 300, stock: 30 },
    { id: 5, nombre: 'Auriculares inalámbricos', precio: 150, stock: 0 }
  ]

  let productos = localStorage.getItem('productos')

  if (productos == null) {
    const listaOriginalJSON = JSON.stringify(listaOriginal)
    localStorage.setItem('productos', listaOriginalJSON)
  }

  productos = localStorage.getItem('productos')
  const productosGuardados = JSON.parse(productos)

  productosGuardados.forEach(producto => {
    const itemProducto = crearItemProducto(producto)

    listaProductos.appendChild(itemProducto)
  })
}

const actualizarLocalStorage = (prodModificado, nuevoStock) => {
  const productos = localStorage.getItem('productos')
  const productosGuardados = JSON.parse(productos)

  const producto = productosGuardados.find((p) => p.id === prodModificado.id)
  producto.stock = nuevoStock

  localStorage.setItem('productos', JSON.stringify(productosGuardados))
}

const crearItemProducto = (producto) => {
  const item = document.createElement('li')

  const nombreProducto = document.createElement('p')
  nombreProducto.textContent = producto.nombre

  const contadorHTML = document.createElement('p')
  contadorHTML.id = 'contadorHTML'
  contadorHTML.textContent = '0'
  contadorHTML.style.textAlign = 'center'
  contadorHTML.style.margin = '2px'
  contadorHTML.style.padding = '2px'

  let contadorJS = parseInt(contadorHTML.textContent)

  const botonComprar = document.createElement('button')
  botonComprar.textContent = 'Comprar'
  botonComprar.classList.add('btn', 'btn-primary', 'me-4')
  botonComprar.style.marginLeft = '20px'
  botonComprar.addEventListener('click', () => procesoDeCompra(producto, contadorJS, contadorHTML)
  )

  const BotonSumar = document.createElement('button')
  BotonSumar.textContent = '+'
  BotonSumar.classList.add('btn', 'btn-success', 'btn-s')
  BotonSumar.addEventListener('click', () => {
    contadorJS++
    contadorHTML.textContent = contadorJS
  })

  const BotonRestar = document.createElement('button')
  BotonRestar.textContent = '-'
  BotonRestar.classList.add('btn', 'btn-danger', 'btn-s')
  BotonRestar.addEventListener('click', () => {
    if (contadorJS <= 0) {
      contadorHTML.textContent = 0
    } else {
      contadorJS--
      contadorHTML.textContent = contadorJS
    }
  })

  const contenedorBotones = document.createElement('div')
  contenedorBotones.id = 'caja_uno'
  contenedorBotones.appendChild(BotonSumar)
  contenedorBotones.appendChild(contadorHTML)
  contenedorBotones.appendChild(BotonRestar)
  contenedorBotones.appendChild(botonComprar)

  item.appendChild(nombreProducto)
  item.appendChild(contenedorBotones)

  return item
}

const verificarStock = async (producto, prodPedidos) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (prodPedidos <= producto.stock & prodPedidos != 0) {
        nuevoStock = producto.stock - prodPedidos
        resolve(nuevoStock)
      } else {
        reject(new Error('No hay Stock'))
      }
    }, 1000)
  })
}

const procesoDeCompra = async (producto, prodPedidos, contadorHTML) => {
  if (prodPedidos == 0) {
    alert('La cantidad no puede ser 0(cero)')
  } else {
    try {
      const resultado = await verificarStock(producto, prodPedidos, contadorHTML)
      actualizarLocalStorage(producto, resultado)
      const totalCompra = prodPedidos * producto.precio
      producto.stock = resultado

      if (producto.stock > 0) {
        alert(`¡Compra Exitosa! Compraste ${prodPedidos} ${producto.nombre} por un total de ${totalCompra} pesos
    Si queres seguir comprando, todavia nos quedan ${producto.stock} en stock`)
      } else {
        alert(`¡Compra Exitosa! Compraste ${prodPedidos} ${producto.nombre} por un total de ${totalCompra} pesos
    `)
      }
    } catch (error) {
      if (producto.stock > 0) {
        alert(`Disculpanos. No tenemos esa cantidad, pero nos queda ${producto.stock} unidad/es 
    si te interesan `)
        console.error(error)
      } else {
        alert('Disculpanos. De momento nos quedamos sin Stock!')
        console.error(error)
      }
    }
  }
}

window.addEventListener('load', cargarTareas)
