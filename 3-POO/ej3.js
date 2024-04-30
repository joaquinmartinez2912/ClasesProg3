// 3) Crear una clase de estudiante que herede de Persona
// Crear una clase Estudiante que herede de la clase Persona y tenga propiedades adicionales 
// como grado y promedio. Implementar métodos para actualizar el promedio y obtener detalles del 
// estudiante.

class Persona {
    constructor (nombre, edad, genero) {
        this.nombre = nombre;
        this.edad = edad;
        this.genero = genero;
    }

    mostrar() {
        console.log(`
        Nombre: ${this.nombre}
        Edad: ${this.edad}
        Genero: ${this.genero}
        `
        )
    }

}

class Estudiante extends Persona {
    constructor (nombre, edad, genero,grado,promedio) {
    super(nombre, edad, genero)
    this.grado = grado
    this.promedio = parseInt(promedio)
    }

    setPromedio(nuevoPromedio) {
        thisPromedio = nuevoPromedio
    }

    mostrar() {
        console.log(`
        Nombre: ${this.nombre}
        Edad: ${this.edad}
        Genero: ${this.genero}
        Promedio: ${this.promedio}
        `
        )
    }    
}

Juan = new Estudiante("Juan",20,"M","A",9)
Juan.mostrar()
