// Ejercicio 2 - Crea un programa que pida al usuario ingresar un número y luego determine si es positivo,
// negativo o cero.

const numero = parseFloat(prompt('Ingrese un numero:'))

const referencia = 0
let resultado = ''

if (numero > referencia) {
  resultado = 'Es mayor que cero'
} else if (numero < referencia) {
  resultado = 'Es menor que cero'
} else {
  resultado = 'Es cero'
}

document.getElementById('resultado').innerText = ` ${resultado}`
