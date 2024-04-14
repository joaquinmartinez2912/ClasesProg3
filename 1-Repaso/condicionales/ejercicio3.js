// Ejercicio 3 - Desarrolla un programa que solicite al usuario ingresar dos números y muestre
// el mayor de ellos.

const num1 = parseFloat(prompt('Ingrese el primer número:'))

const num2 = parseFloat(prompt('Ingrese el segundo número:'))

let resultado = ''

if (num1 > num2) {
  resultado = ` El mayor es el numero ${num1}`
} else if (num2 > num1) {
  resultado = ` El mayor es el numero ${num2}`
} else {
  resultado = 'Los numeros son iguales'
}

document.getElementById('resultado').innerText = `  ${resultado}`
