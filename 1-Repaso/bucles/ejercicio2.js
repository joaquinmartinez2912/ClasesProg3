// 2) Escribe un programa que sume los números del 1 al 100 utilizando un bucle while.

let resultado = 0
let contador = 1
const listaNumeros = document.getElementById('listaNumeros')

while (contador <= 100) {
  resultado = resultado + contador
  const resultadoHTML = document.createElement('li')
  if (resultado > 1) {
    resultadoHTML.textContent = `${resultado - contador} + ${contador} = ${resultado}`
    listaNumeros.appendChild(resultadoHTML)
  }
  contador++
}
