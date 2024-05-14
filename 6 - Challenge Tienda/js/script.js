const listaFetch = document.getElementById("listaFetch")

async function ObtenerProductos() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        console.log(response)
        data.forEach(jsonProducto => {
            const productoFetch = crearItemProducto(jsonProducto);
            listaFetch.appendChild(productoFetch);
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

// function ObtenerProductos() {
//     fetch('https://fakestoreapi.com/products')
//         .then(res => res.json())
//         .then(data => {
//             data.forEach(jsonProducto => {
//                 const productoFetch = crearItemProducto(jsonProducto)
//                 listaFetch.appendChild(productoFetch)
//             })
//         }
//         )
// }

function crearItemProducto(producto) {
    const item = document.createElement('li')
    item.classList.add('list-group-item')
    const DatosProducto = document.createElement('p')
    DatosProducto.textContent = `Nombre: ${producto.title}`
    item.appendChild(DatosProducto)

    return item
}

ObtenerProductos()