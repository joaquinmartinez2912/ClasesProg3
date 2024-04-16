// Dado un array de personas, donde cada objeto tiene las propiedades nombre y edad,
// crea una función que utilice map para generar un nuevo array con los nombres de las personas
// en mayúsculas, luego utilice filter para filtrar solo las personas mayores de 18 años,
// y finalmente utilice find para encontrar la primera persona que tenga exactamente 25 años.

const personas = [
  { nombre: 'Juan', edad: 25 },
  { nombre: 'María', edad: 30 },
  { nombre: 'Pedro', edad: 40 },
  { nombre: 'Ana', edad: 35 },
  { nombre: 'Luis', edad: 22 },
  { nombre: 'Sofía', edad: 28 },
  { nombre: 'Carlos', edad: 45 },
  { nombre: 'Laura', edad: 33 },
  { nombre: 'David', edad: 29 },
  { nombre: 'Elena', edad: 27 }
]

const buscador = personas.map(persona => ({ nombre: persona.nombre.toUpperCase(), edad: persona.edad }))
  .filter(persona => persona.edad > 18)
  .find(persona => persona.edad == 25)

console.log(buscador)
