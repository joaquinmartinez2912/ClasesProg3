const edad = parseFloat(prompt('Ingrese se edad:'))

let mayor = ''
const limite = 18

if (edad >= limite) {
    mayor = 'Es mayor de edad'
} else {
  mayor = 'No es mayor de edad'
}

document.getElementById('resultado').innerText = ` ${mayor}`
