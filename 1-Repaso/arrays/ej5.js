// Dado un array de objetos que representan productos, donde cada objeto tiene las propiedades nombre,
// precio y descuento, crea una función para calcular el precio final de cada producto después de aplicar
// el descuento, luego filtrar solo los productos con un precio final mayor que 50,
// y finalmente utilice una función para  encontrar el primer producto que tenga un descuento del 20%.

const productos = [
  { nombre: 'Camisa', precio: 30, descuento: 10 },
  { nombre: 'Pantalón', precio: 50, descuento: 15 },
  { nombre: 'Zapatos', precio: 80, descuento: 20 },
  { nombre: 'Chaqueta', precio: 100, descuento: 25 },
  { nombre: 'Bufanda', precio: 20, descuento: 5 },
  { nombre: 'Gorra', precio: 15, descuento: 0 },
  { nombre: 'Calcetines', precio: 10, descuento: 0 },
  { nombre: 'Reloj', precio: 120, descuento: 30 },
  { nombre: 'Bolsa', precio: 40, descuento: 10 },
  { nombre: 'Gafas de sol', precio: 60, descuento: 15 }
]

const ListaDescuentos = function (listaProductos) {
  return listaProductos.map(producto => ({ nombre: producto.nombre, precioFinal: producto.precio * (1 - producto.descuento / 100) }))
}
console.log(ListaDescuentos(productos))

const Mayores50 = ListaDescuentos(productos).filter(producto => producto.precioFinal > 50)
console.log(Mayores50)

const BuscarDescuento = function (listaProductos, desc) {
  return listaProductos.find(producto => producto.descuento == desc)
}
console.log(BuscarDescuento(productos, 20))
