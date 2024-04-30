// 1) Crear una clase de persona
// Crear una clase Persona con propiedades como nombre, edad y género.
// Implementar un método para imprimir los detalles de la persona.

class Persona {
  constructor (nombre, edad, genero) {
    this.nombre = nombre
    this.edad = edad
    this.genero = genero
  }

  mostrar () {
    console.log(`
        Nombre: ${this.nombre}
        Edad: ${this.edad}
        Genero: ${this.genero}
        `
    )
  }
}

Juan = new Persona('Juan', 20, 'M')
Juan.mostrar()
