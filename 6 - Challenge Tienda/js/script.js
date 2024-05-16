const listaCategorias = document.getElementById("listaCategorias")
const listaProductosPorCategoria = document.getElementById("listaProductosDeCategorias")

async function ObtenerCategorias() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();

        data.forEach(categoria => {
            const categoriaFetch = crearLinkCategoria(categoria);
            listaCategorias.appendChild(categoriaFetch);
        });
        console.log(data)
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


async function ObtenerProductosPorCategoria(estado) {
    const ruta = `https://fakestoreapi.com/products/category/${estado}`
    // TODO: Crear los li que se van a ir sumando a la lista "listaProductosPorCategoria"
    // TODO: y hacer que se remuevan cuando selecciono otra categoria
    try {
        const response = await fetch(ruta);
        const data = await response.json();
        console.log(data)


    } catch (error) {
        console.error('Error al obtener categorias:', error);
    }
}


ObtenerCategorias()
