// 3) Utiliza un bucle forEach para imprimir cada elemento del array de frutas

// Array de nombres
const nombres = ['Manzana', 'Banana', 'Naranja', 'Mandarina', 'Frutilla']
const listaFrutas = document.getElementById('listaFrutas')

nombres.forEach(nombre => {
  const fruta = document.createElement('li')
  fruta.textContent = nombre
  listaFrutas.appendChild(fruta)
}
)
