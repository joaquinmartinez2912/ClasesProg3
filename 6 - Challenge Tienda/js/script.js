const listaCategorias = document.getElementById("listaCategorias")
const listaProductosPorCategoria = document.getElementById("listaProductosPorCategoria")
const listaDetalleProducto = document.getElementById("listaDetalleProducto")
const listaDetalleCarrito = document.getElementById("listaDetalleCarrito")

async function ObtenerCategorias() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json()

        data.forEach(categoria => {
            const categoriaFetch = crearLinkCategoria(categoria)
            listaCategorias.appendChild(categoriaFetch)
        });
       
    } catch (error) {
        console.error('Error al obtener categorias:', error)
    }
}

function crearLinkCategoria(categoria) {
    const listItem = document.createElement("li")

    const link = document.createElement("a")
    link.classList.add("dropdown-item")
    link.textContent = ` ${categoria}`
    //NOTE: Ver si esta bien pasar el nombre del HTML asi.
    const nombrePagina = `${categoria.split(/\s|'/)[0]}`

    link.href = `${nombrePagina}.html`

    link.onclick = (e) => {
        e.preventDefault();
        localStorage.setItem('paginaCategoria', categoria)
        window.location.href = link.href
        
    };

    listItem.appendChild(link)
    return listItem
}

function crearContenedorProducto(producto) {
 
    const cardDiv = document.createElement("div")
    cardDiv.classList.add("card")
    //NOTE: Ver si conviene poner el ancho directamente o es mejor dejarlo con el wrap y el ancho de columna que recibe de "agregarProductosAContenedor".
    cardDiv.style.width = "288px" 
    cardDiv.style.height = "400px"
    cardDiv.style.display = "flex"
    cardDiv.style.flexWrap = "wrap"
    cardDiv.style.gap = "10px"

    const cardImg = document.createElement("img")
    cardImg.className = "card-img-top"
    cardImg.style.height = "200px"
    cardImg.src = producto.image

    const cardBodyDiv = document.createElement("div")
    cardBodyDiv.className = "card-body"
    cardBodyDiv.style.display = "flex"
    cardBodyDiv.style.flexDirection = "column"
    cardBodyDiv.style.justifyContent = "space-between"

    const cardTitle = document.createElement("h6")
    cardTitle.className = "card-title"
    cardTitle.textContent = producto.title

    const cardPrice = document.createElement("p")
    cardPrice.textContent = `$ ${producto.price}`
    cardPrice.style.margin  = "0px"
    cardPrice.style.fontSize = "20px"

    const cardLink = document.createElement("a")
    cardLink.className = "btn btn-primary"
    cardLink.href = "detalle.html"
    cardLink.textContent = "Ingresar"
    cardLink.style.alignSelf = "start"
    
    cardLink.onclick = (e) => {
        e.preventDefault()
        localStorage.setItem('productoDetalle', JSON.stringify(producto))
        window.location.href = cardLink.href; //NOTE: Ver si hay alguna alternativa.
    };

    cardBodyDiv.appendChild(cardPrice)
    cardBodyDiv.appendChild(cardTitle)
    cardBodyDiv.appendChild(cardLink)

    cardDiv.appendChild(cardImg)
    cardDiv.appendChild(cardBodyDiv)

    return cardDiv;
}

function agregarProductosAContenedor(productos) {
    const row = document.createElement('div')
    row.className = 'row'
   
    productos.forEach((producto) => {
        const col = document.createElement('div')
        col.className = 'col-md-4 mb-4';

        const card = crearContenedorProducto(producto)
        col.appendChild(card)
        row.appendChild(col)
    });

    listaProductosPorCategoria.appendChild(row);
}

async function ObtenerProductosPorCategoria(estado) {
    const ruta = `https://fakestoreapi.com/products/category/${estado}`

    try {
        const response = await fetch(ruta);
        const data = await response.json();
        // console.log(data)
        agregarProductosAContenedor(data)
    } catch (error) {
        console.error('Error al obtener categorias:', error)
    }
}

function mostrarDetalle (producto) {
    const productoDetalle = crearDetalleProducto(producto)
    listaDetalleProducto.appendChild(productoDetalle)
}

function crearDetalleProducto (productoDetalle) {
    const cardDiv = document.createElement("div")
    cardDiv.classList.add("card")
    cardDiv.style.width = "600px"
    // cardDiv.style.height = "650px"
    cardDiv.style.display = "flex"
    cardDiv.style.flexWrap = "wrap"
    cardDiv.style.alignItems = "center"
    cardDiv.style.justifyContent = "center"
    cardDiv.style.gap = "10px"

    const cardImg = document.createElement("img")
    cardImg.className = "card-img-top"
    cardImg.style.height = "300px"
    cardImg.style.width = "450px"
    cardImg.src = productoDetalle.image

    const cardBodyDiv = document.createElement("div")
    cardBodyDiv.className = "card-body"
    cardBodyDiv.style.display = "flex"
    cardBodyDiv.style.flexDirection = "column"
    cardBodyDiv.style.justifyContent = "space-between"

    const cardTitle = document.createElement("h6")
    cardTitle.className = "card-title"
    cardTitle.textContent = productoDetalle.title

    const cardDescription = document.createElement("p")
    cardDescription.className = "card-text"
    cardDescription.textContent = productoDetalle.description

    const cardPrice = document.createElement("p")
    cardPrice.textContent = `$ ${productoDetalle.price}`
    cardPrice.style.margin  = "0px"
    cardPrice.style.fontSize = "20px"

    
    const contadorHTML = document.createElement('p')
    contadorHTML.id = 'contadorHTML'
    contadorHTML.textContent = '0'
    contadorHTML.style.textAlign = 'center'
    contadorHTML.style.margin = '2px'
    contadorHTML.style.padding = '2px'
    
    let contadorJS = parseInt(contadorHTML.textContent)
    
    const BotonSumar = document.createElement('button')
    BotonSumar.textContent = '+'
    BotonSumar.classList.add('btn', 'btn-success', 'btn-s')
    BotonSumar.addEventListener('click', () => {
        contadorJS++
        contadorHTML.textContent = contadorJS
    })
    
    const cardLink = document.createElement("a")
    cardLink.className = "btn btn-primary"
    cardLink.textContent = "Agregar al carro"
    cardLink.style.alignSelf = "start"
    cardLink.onclick = () => {AgregarYMostrarCarrito(productoDetalle,contadorJS)}
    
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
    contenedorBotones.id = 'caja_botones'

    const sumaResta = document.createElement('div')
    sumaResta.style.display = 'flex'
    sumaResta.style.justifyContent = 'space-evenly'
    sumaResta.style.marginLeft = "15px"
    sumaResta.appendChild(BotonRestar)
    sumaResta.appendChild(contadorHTML)
    sumaResta.appendChild(BotonSumar)

    contenedorBotones.appendChild(cardLink)
    contenedorBotones.appendChild(sumaResta)
  
    cardBodyDiv.appendChild(cardPrice)
    cardBodyDiv.appendChild(cardTitle)
    cardBodyDiv.appendChild(cardDescription)
    cardBodyDiv.appendChild(contenedorBotones)

    cardDiv.appendChild(cardImg)
    cardDiv.appendChild(cardBodyDiv)

    return cardDiv;

}

const obtenerCarritoLocalStorage = () => {
    const carritoString = localStorage.getItem('carrito')
    return carritoString ? JSON.parse(carritoString) : []
  }
  

const guardarCarritoLocalStorage = (prodCarrito) => {
    localStorage.setItem('carrito', JSON.stringify(prodCarrito))
}

const crearId = () => {
    const carritoString = localStorage.getItem('carrito')
    const listaId = carritoString ? JSON.parse(carritoString) : []
    let id = ''
    if (listaId.length == 0) {
        id = 0
    } else {
        id = parseInt(listaId.length)
        let verificacion = listaId.find((prod) => prod.id === parseInt(listaId.length))
        while (verificacion) {
            id = parseInt(listaId.length)+1
            verificacion = listaId.find((prod) => prod.id === parseInt(listaId.length))
        }
    }
    return id
}

async function agregarProductoAlCarrito(producto, cantidad) {
    try {
        // const img = producto.image
        const id = crearId()
        const nombre = producto.title
        const cantComprada = cantidad
        const precio = producto.price
    
        const carrito = obtenerCarritoLocalStorage()
    
        itemCarrito = {id,nombre,cantComprada,precio}
        carrito.push(itemCarrito)
    
        guardarCarritoLocalStorage(carrito)
    } catch(error){
        console.log("Error guardando en el carrito: ",error)
    }

}

function crearItemCarrito(producto) {
    const item = document.createElement('tr')
    
    const nombre = document.createElement('td')
    nombre.textContent = producto.nombre;
    
    const cantidad = document.createElement('td')
    cantidad.textContent = producto.cantComprada
    
    const precio = document.createElement('td')
    precio.textContent = `USD ${producto.precio}`
    
    const total = document.createElement('td')
    total.textContent = producto.cantComprada * producto.precio;

    const tdEliminar = document.createElement('td')
    const iconoEliminar = document.createElement('i')
    iconoEliminar.className = 'bi bi-trash'
    iconoEliminar.style.cursor = 'pointer'
    iconoEliminar.onclick = async () => {
        eliminarDelCarrito(producto.id)
        item.remove()
    }

    tdEliminar.appendChild(iconoEliminar)

    item.appendChild(nombre)
    item.appendChild(cantidad)
    item.appendChild(precio)
    item.appendChild(total)
    item.appendChild(tdEliminar)

    return item;
}

async function AgregarYMostrarCarrito(producto, cantidad){
    try{
        await agregarProductoAlCarrito(producto, cantidad)
        listaCarrito = obtenerCarritoLocalStorage()
        prod =  crearItemCarrito(listaCarrito.at(-1))
        listaDetalleCarrito.appendChild(prod)

    } catch(error){
        console.log("Error agregando y mostrando el carrito: ",error)
    }
 
} 

function eliminarDelCarrito (id) {
    const carrito = obtenerCarritoLocalStorage()
    const carritoModif = carrito.filter(item => item.id !== id)
    guardarCarritoLocalStorage(carritoModif)

}

function mostrarCarrito () {
    try{
        listaCarrito = obtenerCarritoLocalStorage()
        listaCarrito.forEach(prod => {
            const item = crearItemCarrito(prod)
            listaDetalleCarrito.appendChild(item)
        })
    } catch(error){
        console.log("Error mostrando el carrito: ",error)
    }
 
}

// Programa:

ObtenerCategorias()

document.addEventListener('DOMContentLoaded', () => {
    const categoria = localStorage.getItem('paginaCategoria')
    const detalleProducto = JSON.parse(localStorage.getItem('productoDetalle'))
    const detalleCarrito = obtenerCarritoLocalStorage()
    
    if (categoria) {
        ObtenerProductosPorCategoria(categoria)
        localStorage.removeItem('paginaCategoria')
    }
    if (detalleProducto) {
        mostrarDetalle(detalleProducto)
        localStorage.removeItem('productoDetalle')
    }
    if (detalleCarrito) {
        if (listaDetalleCarrito){
            mostrarCarrito()
        }
    }
});





