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
    //NOTE: Ver si conviene poner el ancho directamente o es mejor dejarlo con el wrap y el ancho de columna que recibe de "agregarProductosAContenedor".
    cardDiv.style.width = "288px"; 
    cardDiv.style.height = "384px"
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

    const cardLink = document.createElement("a");
    cardLink.className = "btn btn-primary";
    cardLink.href = "#";
    cardLink.textContent = "Ingresar";
    cardLink.style.alignSelf = "start";

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



