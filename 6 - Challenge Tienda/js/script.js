const listaFetch = document.getElementById("listaFetch")

async function ObtenerProductos() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
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

function crearItemProducto(producto) {
    const item = document.createElement('li')
    item.classList.add('list-group-item')
    const DatosProducto = document.createElement('p')
    DatosProducto.textContent = ` ${producto}`
    const botonMostrar = document.createElement('button')
    botonMostrar.textContent = 'Mostrar'
    botonMostrar.classList.add('btn', 'btn-success', 'ml-5', 'flex')


    const contenedorBotones = document.createElement('div')
    contenedorBotones.classList.add('row','space-between')
    contenedorBotones.id = 'caja_uno'
    contenedorBotones.appendChild(DatosProducto)
    contenedorBotones.appendChild(botonMostrar)

    item.appendChild(contenedorBotones)
    

    return item
}

ObtenerProductos()
