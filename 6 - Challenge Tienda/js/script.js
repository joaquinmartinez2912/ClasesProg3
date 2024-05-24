const listaCategorias = document.getElementById("listaCategorias")
const listaProductosPorCategoria = document.getElementById("listaProductosPorCategoria")
const listaDetalleProducto = document.getElementById("listaDetalleProducto")
const listaDetalleCarrito = document.getElementById("listaDetalleCarrito")
let totalAPagar = document.getElementById("totalizar")
let tipoDeCamnio = document.getElementById("tipoDeCambio")
let totalEnPesos = document.getElementById("totalEnPesos")

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

// ----------------------------------------------------------

async function ObtenerProductosPorCategoria(estado) {
    const ruta = `https://fakestoreapi.com/products/category/${estado}`
    try {
        const response = await fetch(ruta);
        const data = await response.json();
        agregarProductosACategoria(data)
    } catch (error) {
        console.error('Error al obtener categorias:', error)
    }
}

function agregarProductosACategoria(productos) {
    const row = document.createElement('div')
    row.className = 'row'
   
    productos.forEach((producto) => {
        const col = document.createElement('div')
        col.className = 'col-md-4 mb-4';

        const card = crearCardProducto(producto)
        col.appendChild(card)
        row.appendChild(col)
    });

    listaProductosPorCategoria.appendChild(row);
}

function crearCardProducto(producto) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.id = "cardProducto";
    cardDiv.innerHTML = `
        <img class='card-img-top' src="${producto.image}" height="200px" alt="Producto">
        <div class='card-body' id='cardProductoInterna'>
            <p style="margin:0px; font-size:20px">$ ${producto.price}</p>
            <h6 class='card-title'>${producto.title}</h6>
            <a class='btn btn-primary' style="align-self: start;" href='detalle.html?product=${producto.id}')'>Ingresar</a>
        </div>
    `;
    return cardDiv;
}

// ----------------------------------------------------------

async function mostrarDetalleProducto (productoId) {
        const response = await fetch(`https://fakestoreapi.com/products/${productoId}`);
        const data = await response.json()
    
        const productoDetalle = await crearDetalleProducto(data)
        listaDetalleProducto.appendChild(productoDetalle)
}

async function crearDetalleProducto(productoDetalle) {
    const cardDiv = document.createElement("div")
    cardDiv.classList.add("card")
    cardDiv.id = "crearDetalleProductoDiv"

    cardDiv.innerHTML = `
        <img class="card-img-top" style="height: 300px; width: 450px;" src="${productoDetalle.image}" />
        <div id="crearDetalleProductCardBody" class="card-body">
            <p style="margin: 0px; font-size: 20px;">$ ${productoDetalle.price}</p>
            <h6 class="card-title">${productoDetalle.title}</h6>
            <p class="card-text">${productoDetalle.description}</p>
            <div id="crearDetalleProductBotonera">
                <a id="agregarAlCarrito" class="btn btn-primary" style="align-self: start;">Agregar al carro</a>
                <div style="display: flex; justify-content: space-evenly; margin-left: 15px;">
                    <button id="botonRestar" class="btn btn-danger btn-s">-</button>
                    <p id="contadorHTML" style="text-align: center; margin: 2px; padding: 2px;">0</p>
                    <button id="botonSumar" class="btn btn-success btn-s">+</button>
                </div>
            </div>
        </div>
    `
    const contadorHTML = cardDiv.querySelector('#contadorHTML')
    let contadorJS = parseInt(contadorHTML.textContent)

    const BotonSumar = cardDiv.querySelector('#botonSumar')
    const BotonRestar = cardDiv.querySelector('#botonRestar')
    const cardLink = cardDiv.querySelector('#agregarAlCarrito')

    BotonSumar.addEventListener('click', () => {
        contadorJS++
        contadorHTML.textContent = contadorJS
    });

    BotonRestar.addEventListener('click', () => {
        if (contadorJS > 0) {
            contadorJS--
            contadorHTML.textContent = contadorJS;
        }
    });

    cardLink.onclick = () => {
        console.log("Entro")
        AgregarYMostrarCarrito(productoDetalle, contadorJS)
    };

    return cardDiv;
}

// ---------------------

async function AgregarYMostrarCarrito(producto, cantidad){
    try{
        await agregarProductoAlCarrito(producto, cantidad) // Porque espera que se agrga al localStorage
        const listaCarrito = await obtenerCarritoLocalStorage() 
        const prod = await crearItemCarrito(listaCarrito.at(-1)) //Para agregarlo a la parte visual.
        listaDetalleCarrito.appendChild(prod)
        await totalizar(listaCarrito)

    } catch(error){
        console.log("Error agregando y mostrando el carrito: ",error)
    }
} 

async function agregarProductoAlCarrito(producto, cantidad) {
    try {
        const id = crearId()
        const nombre = producto.title
        const cantComprada = cantidad
        const precio = producto.price
        const image = producto.image
    
        const carrito = await obtenerCarritoLocalStorage()
    
        itemCarrito = {id,nombre,cantComprada,precio, image}
        carrito.push(itemCarrito)
    
        await guardarCarritoLocalStorage(carrito)
    } catch(error){
        console.log("Error guardando en el carrito: ",error)
    }

}

async function crearItemCarrito(producto) {
    const item = document.createElement('tr')
    item.innerHTML = `
    <td> ${producto.nombre}</td>
    `
    //NOTE: A la etiqueta <i> le agrego un id
    item.innerHTML = `
    <td> <img src=${producto.image} width=30px height=30px alt=${producto.nombre}</img></td>
    <td>${producto.nombre}</td>
    <td>${producto.cantComprada}</td>
    <td>USD ${producto.precio}</td>
    <td>USD ${producto.cantComprada * producto.precio}</td>
    <td> <i class='bi bi-trash ' style="cursor: pointer;"id="eliminar${producto.id}"></i></td>
    `
    //NOTE: Busco el id que defini en detalle.html fila 56 y le agrego el item que acabo de crear 
    //NOTE: para que quede dentro del contexto
    document.getElementById('listaDetalleCarrito').appendChild(item)
    
    document.getElementById(`eliminar${producto.id}`).onclick = async () => {
        await eliminarDelCarrito(producto.id);
        item.remove();
    }

    return item;
}

async function eliminarDelCarrito (id) {
    try {
        const carrito = obtenerCarritoLocalStorage()
        const carritoModif = carrito.filter(item => item.id !== id)
        guardarCarritoLocalStorage(carritoModif)
        const carritoLocalModif = obtenerCarritoLocalStorage()
        await totalizar(carritoLocalModif)
    } catch(error){
        console.log("Error al eliminar el producto", error)
    }
}

async function totalizar (lista) {
    try {
        const response =  await fetch('https://dolarapi.com/v1/dolares/oficial');
        const data = await response.json()
        tipoDeCamnio.textContent = `$ ${data.venta}`

        let total = 0
        lista.forEach(prod => total=total + (prod.cantComprada*prod.precio))
        totalAPagar.textContent = `USD ${total}`

        let pesificado = parseInt(total) * parseInt(data.venta)
        totalEnPesos.textContent = `$ ${pesificado}`
       
    } catch (error) {
        console.error('Error al totalizar:', error)
    }
}

// ---------------------

async function mostrarCarrito () {
    try{
        listaCarrito = await obtenerCarritoLocalStorage()
        listaCarrito.forEach(async (prod) =>  {
            const item = await crearItemCarrito(prod)
            listaDetalleCarrito.appendChild(item)   
        }
    )
    await totalizar(listaCarrito)
    } catch(error){
        console.log("Error mostrando el carrito: ",error)
    }
}

// ----------------------------------------------------------

const obtenerCarritoLocalStorage = async () => {
    const carritoString = localStorage.getItem('carrito')
    return carritoString ? JSON.parse(carritoString) : []
}

const guardarCarritoLocalStorage = async (prodCarrito) => {
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


// Programa:

function main () {

        const categoria = localStorage.getItem('paginaCategoria')

        ObtenerCategorias()

        // Funciona en base a la existencia del localStorage que se genera al hacer click en alguna categoria.
        // Crea la funcion que obtiene y muestra los productos de cada categoria.
        if (categoria) {
            ObtenerProductosPorCategoria(categoria)
            localStorage.removeItem('paginaCategoria')
        }

        // Funciona en base a la existencia del parametro que recien nace cuando se hace click en alguno de los productos
        //  y crea la funcion que muestra el producto individual 
        const queryString = window.location.search
        urlParams = new URLSearchParams(queryString)
        product = urlParams.get('product')
        if (product) {
            mostrarDetalleProducto(product) 
        }

        // Funcionan en base a un localStorage que se genera cuando se ingresa en la pagina del carrito.
        // Muestra el producto individual, el carrito y crea y ejecuta al click las funcinoes para agreagar al carrito.
        if (listaDetalleCarrito){
            mostrarCarrito()
        }
   
}    

main()



