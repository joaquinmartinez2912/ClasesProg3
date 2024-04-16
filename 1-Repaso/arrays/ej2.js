// Dado un array de números, crea una función que utilice filter para filtrar solo los
// números pares y devolver un nuevo array con esos números.

const numeros = [2, 6, 3, 1, 15, 18]
const pares = numeros.filter(numero => numero % 2 === 0)
console.log(pares)
