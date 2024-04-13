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
