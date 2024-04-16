// Dado un array de números, crea una función que utilice map para duplicar cada número en el array
// y devolver un nuevo array con los resultados.

const numeros = [1, 2, 3, 4, 5]
let dobles = []

dobles = numeros.map(numero => (numero * 2))
console.log(dobles)
