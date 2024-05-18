const listaCategorias = document.getElementById("listaCategorias")
const listaProductosPorCategoria = document.getElementById("listaProductosPorCategoria")

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
    // link.setAttribute("href", "productosCategoria.html");
    link.textContent = ` ${categoria}`;
    link.onclick = (e) => {
        e.preventDefault(); 
        ObtenerProductosPorCategoria(categoria); 
    };

    listItem.appendChild(link);
    return listItem
}

function crearContenedorProducto(producto) {
 
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.style.width = "18rem";

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.src = producto.image;
    cardImg.alt = "Descripción de la imagen";

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = producto.title;

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    // cardText.textContent = producto.description;

    const cardLink = document.createElement("a");
    cardLink.className = "btn btn-primary";
    cardLink.href = "#";
    cardLink.textContent = "Comprar";

    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardText);
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
        
        const ArraylistaProductosPorCategoria = Array.from(listaProductosPorCategoria.childNodes)
        if (ArraylistaProductosPorCategoria.length != 0) {
            ArraylistaProductosPorCategoria.forEach((producto) => {
                listaProductosPorCategoria.removeChild(producto)
            })
        }
        
        agregarProductosAContenedor(data)
    } catch (error) {
        console.error('Error al obtener categorias:', error);
    }
}


ObtenerCategorias()
