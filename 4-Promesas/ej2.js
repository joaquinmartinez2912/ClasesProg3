// Simulación de proceso de compra:
// Escribe un programa donde el usuario tenga una lista de productos, 
// cada uno con un botón que diga “Comprar” que al presionarlo dispare una función llamada
//  procesoDeCompra que tome el producto seleccionado como argumento y devuelva una promesa.
//   Esta promesa debe simular un proceso de compra, que incluya verificar la disponibilidad del producto,
//    calcular el precio total y confirmar la compra después de un breve período de espera, 
//    todos estos datos los tengo que ver en una alerta.

const productos = [
    { id: 1, nombre: 'Laptop', precio: 1200, stock: 10 },
    { id: 2, nombre: 'Teléfono móvil', precio: 800, stock: 0 },
    { id: 3, nombre: 'Tablet', precio: 500, stock: 15 },
    { id: 4, nombre: 'Smartwatch', precio: 300, stock: 30 },
    { id: 5, nombre: 'Auriculares inalámbricos', precio: 150, stock: 0 }
];
