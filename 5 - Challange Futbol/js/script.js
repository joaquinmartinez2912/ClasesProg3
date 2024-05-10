 // Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores');
    return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
let idJugador = parseInt(0)
const agregarJugador = async () => {
    try {
        // Solicitar al usuario que ingrese los datos del jugador
        const nombre = prompt("Ingrese el nombre del jugador:");
        const edad = parseInt(prompt("Ingrese la edad del jugador:"));
        const posicion = prompt("Ingrese la posición del jugador:");
        const id = idJugador++
     
        // Obtener los jugadores del localStorage
        let jugadores = obtenerJugadoresLocalStorage();

        // Verificar si el jugador ya existe en el equipo
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.');
        }

        // Agregar el nuevo jugador al array de jugadores
        jugadores.push({id, nombre, edad, posicion });

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresLocalStorage(jugadores);

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mostrar un mensaje de éxito
        alert('Jugador agregado correctamente.');
    } catch (error) {
        console.error('Error:', error.message);
    }
};


// Funcion que crea li que se va a usar para mostrar elementos.
const crearItemJugador = (jugador) => {
    const item = document.createElement('li')

    const DatosJugador = document.createElement('p')
    DatosJugador.textContent = `Nombre: ${jugador.nombre} - Edad: ${jugador.edad} - Posición: ${jugador.posicion}`

    item.appendChild(DatosJugador)

    return item
}

// Función asíncrona para listar todos los jugadores del equipo
const listaJugadores = document.getElementById("listaJugadores")
let estadoListaJugadores = "inactivo"

const listarJugadores = async () => {
    // Implementación para listar todos los jugadores--AGREGAR LOGICA DE TRY/CATCH
    if (estadoListaJugadores === "inactivo") {
        let jugadores = obtenerJugadoresLocalStorage();
    
        jugadores.forEach(element => {
            const jugador = crearItemJugador(element)
            listaJugadores.appendChild(jugador)
            console.log(element.nombre)
        });

        estadoListaJugadores = "activa"
    } else if (estadoListaJugadores === "activa") {
        const arrayListaJugadores = Array.from(listaJugadores.childNodes)
        arrayListaJugadores.forEach(element => {
            listaJugadores.removeChild(element)
        });
        estadoListaJugadores = "inactivo"
    }
};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (nombreJugador, nuevaPosicion) => {
    // Implementación para asignar una nueva posición a un jugador--AGREGAR LOGICA DE TRY/CATCH
    let jugadores = obtenerJugadoresLocalStorage();

    const jugadorModificado = jugadores.find((j) => j.id === nombreJugador.id)

    if (jugadorModificado){
        nombreJugador.posicion = nuevaPosicion
    }

    guardarJugadoresLocalStorage(jugadores);
};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async (jugadorEntrante, jugadorSaliente) => {
    // Implementación para realizar un cambio durante un partido
};

// Función principal asíncrona que interactúa con el usuario
const main = async () => {
    try {
        // Lógica para interactuar con el usuario y llamar a las funciones adecuadas
    } catch (error) {
        console.error('Error:', error);
    }
};

// Llamar a la función principal para iniciar la aplicación
main();
