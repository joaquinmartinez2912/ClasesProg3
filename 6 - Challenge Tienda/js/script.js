const listaCategorias = document.getElementById("listaCategorias")
const listaProductosPorCategoria = document.getElementById("listaProductosPorCategoria")
const listaDetalleProducto = document.getElementById("listaDetalleProducto")

async function ObtenerCategorias() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();

        data.forEach(categoria => {
            const categoriaFetch = crearLinkCategoria(categoria);
            listaCategorias.appendChild(categoriaFetch);
        });
       
    } catch (error) {
        console.error('Error al obtener categorias:', error);
    }
}

function crearLinkCategoria(categoria) {
    const listItem = document.createElement("li");

    const link = document.createElement("a");
    link.classList.add("dropdown-item");
    link.textContent = ` ${categoria}`;
    //NOTE: Ver si esta bien pasar el nombre del HTML asi.
    const nombrePagina = `${categoria.split(/\s|'/)[0]}`

    link.href = `${nombrePagina}.html`;

    link.onclick = (e) => {
        e.preventDefault(); 
        localStorage.setItem('paginaCategoria', categoria);
        window.location.href = link.href;
        
    };

    listItem.appendChild(link);
    return listItem
}

function crearContenedorProducto(producto) {
 
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    //NOTE: Ver si conviene poner el ancho directamente o es mejor dejarlo con el wrap y el ancho de columna que recibe de "agregarProductosAContenedor".
    cardDiv.style.width = "288px"; 
    cardDiv.style.height = "400px"
    cardDiv.style.display = "flex";
    cardDiv.style.flexWrap = "wrap";
    cardDiv.style.gap = "10px";

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.style.height = "200px"
    cardImg.src = producto.image;

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";
    cardBodyDiv.style.display = "flex";
    cardBodyDiv.style.flexDirection = "column";
    cardBodyDiv.style.justifyContent = "space-between";

    const cardTitle = document.createElement("h6");
    cardTitle.className = "card-title";
    cardTitle.textContent = producto.title;

    const cardPrice = document.createElement("p")
    cardPrice.textContent = `$ ${producto.price}`
    cardPrice.style.margin  = "0px"
    cardPrice.style.fontSize = "20px"

    const cardLink = document.createElement("a");
    cardLink.className = "btn btn-primary";
    cardLink.href = "detalle.html";
    cardLink.textContent = "Ingresar";
    cardLink.style.alignSelf = "start";
    console.log(producto)
    cardLink.onclick = (e) => {
        e.preventDefault(); 
        localStorage.setItem('productoDetalle', JSON.stringify(producto));
        window.location.href = cardLink.href; //NOTE: Ver si hay alguna alternativa.
    };

    cardBodyDiv.appendChild(cardPrice);
    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardLink);

    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardBodyDiv);

    return cardDiv;
}

function agregarProductosAContenedor(productos) {
    const row = document.createElement('div');
    row.className = 'row';
   
    productos.forEach((producto) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4'; 

        const card = crearContenedorProducto(producto);
        col.appendChild(card);
        row.appendChild(col);
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
        console.error('Error al obtener categorias:', error);
    }
}

function mostrarDetalle (producto) {
    const productoDetalle = crearDetalleProducto(producto);
    listaDetalleProducto.appendChild(productoDetalle)
}

function crearDetalleProducto (productoDetalle) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.style.width = "600px"; 
    cardDiv.style.height = "650px"
    cardDiv.style.display = "flex";
    cardDiv.style.flexWrap = "wrap";
    cardDiv.style.alignItems = "center"; // Centra los elementos verticalmente
    cardDiv.style.justifyContent = "center"; // Centra los elementos horizontalmente
    cardDiv.style.gap = "10px";

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.style.height = "300px";
    cardImg.style.width = "450px";
    cardImg.src = productoDetalle.image;

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";
    cardBodyDiv.style.display = "flex";
    cardBodyDiv.style.flexDirection = "column";
    cardBodyDiv.style.justifyContent = "space-between";

    const cardTitle = document.createElement("h6");
    cardTitle.className = "card-title";
    cardTitle.textContent = productoDetalle.title;

    const cardDescription = document.createElement("p");
    cardDescription.className = "card-text";
    cardDescription.textContent = productoDetalle.description;

    const cardPrice = document.createElement("p")
    cardPrice.textContent = `$ ${productoDetalle.price}`
    cardPrice.style.margin  = "0px"
    cardPrice.style.fontSize = "20px"

    const cardLink = document.createElement("a");
    cardLink.className = "btn btn-success";
    cardLink.textContent = "Agregar al carro";
    cardLink.style.alignSelf = "start";

    cardBodyDiv.appendChild(cardPrice);
    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardDescription);
    cardBodyDiv.appendChild(cardLink);

    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardBodyDiv);

    return cardDiv;

}

// Programa:

ObtenerCategorias()

document.addEventListener('DOMContentLoaded', () => {
    const categoria = localStorage.getItem('paginaCategoria');
    const detalleProducto = JSON.parse(localStorage.getItem('productoDetalle'));
    
    if (categoria) {
        ObtenerProductosPorCategoria(categoria);
        // localStorage.removeItem('paginaCategoria');
    }
    if (detalleProducto) {
        console.log(detalleProducto)
        console.log(detalleProducto.price)
        mostrarDetalle(detalleProducto);
        // localStorage.removeItem('productoDetalle');
    }
});





