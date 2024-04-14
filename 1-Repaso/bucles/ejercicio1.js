// 1) Utiliza un bucle for para imprimir los números del 1 al 10 por pantalla.

const listaNumeros = document.getElementById('listaNumeros')

for (let numero = 1; numero <= 10; numero++) {
  const nuevoNumero = document.createElement('li')
  nuevoNumero.textContent = numero
  listaNumeros.appendChild(nuevoNumero)
}
