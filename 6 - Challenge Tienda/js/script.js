const listaCategorias = document.getElementById("listaCategorias")
const listaProductos = document.getElementById("listaProductos")

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
    link.setAttribute("href", "productosCategoria.html");
    link.textContent = ` ${categoria}`;

    listItem.appendChild(link);
    return listItem
}

async function ObtenerProductosPorCategoria(estado) {
    const ruta = `https://fakestoreapi.com/products/category/${estado}`

    try {
        const response = await fetch(ruta);
        const data = await response.json();
        console.log(data)


    } catch (error) {
        console.error('Error al obtener categorias:', error);
    }
}


ObtenerCategorias()
ObtenerProductosPorCategoria('jewelery')