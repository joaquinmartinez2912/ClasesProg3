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
    const listaOriginal =     [
        { id: 1, nombre: 'Laptop', precio: 1200, stock: 10 },
        { id: 2, nombre: 'Teléfono móvil', precio: 800, stock: 0 },
        { id: 3, nombre: 'Tablet', precio: 500, stock: 15 },
        { id: 4, nombre: 'Smartwatch', precio: 300, stock: 30 },
        { id: 5, nombre: 'Auriculares inalámbricos', precio: 150, stock: 0 }
    ];

    let productos = localStorage.getItem('productos');  
    console.log(productos)

    if (productos == null) {
        const listaOriginalJSON = JSON.stringify(listaOriginal);
        localStorage.setItem('productos', listaOriginalJSON)
    } 
    
    productos = localStorage.getItem('productos');  
    const productosGuardados = JSON.parse(productos);
    console.log(productos)
    console.log(productosGuardados)

    productosGuardados.forEach(producto => {
      const itemProducto = crearItemProducto(producto.nombre)

        listaProductos.appendChild(itemProducto)      
    })
  }
  
  const crearItemProducto = (nombre) => {
    const item = document.createElement('li')
  
    const nombreProducto = document.createElement('p')
    nombreProducto.textContent = nombre
    
    const botonComprar = document.createElement('button')
    botonComprar.textContent = 'Comprar'
    botonComprar.classList.add('btn', 'btn-success', 'ml-5')
    botonComprar.addEventListener('click', () => {
        // Aca iria la logica del proceso de compra
    })
    
    item.appendChild(nombreProducto)
    item.appendChild(botonComprar)
  
    return item
  }

  window.addEventListener('load', cargarTareas)
