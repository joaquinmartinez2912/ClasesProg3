// 2) Crear una clase de libro
// Crear una clase Libro con propiedades como título, autor y año de publicación.
//  Implementar métodos para obtener y establecer estas propiedades.

const { ESLint } = require("eslint");

class Libro {
    constructor(titulo, autor,publicado) {
        this.titulo = titulo;
        this.autor = autor;
        this.publicado = publicado;
    }

    getTitulo(){
        return this.titulo
    }

    setTitulo(nuevoTitulo){
        this.titulo = nuevoTitulo
    }
}

ESDLA = new Libro("El señor de los anillos", "J.R.R Tolkien", "1954")
console.log(ESDLA.getTitulo())
ESDLA.setTitulo("Las Dos Torres")
console.log(ESDLA.getTitulo())