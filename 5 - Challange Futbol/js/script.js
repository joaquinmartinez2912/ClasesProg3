// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
  const jugadoresString = localStorage.getItem('jugadores')
  return jugadoresString ? JSON.parse(jugadoresString) : []
}

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
  localStorage.setItem('jugadores', JSON.stringify(jugadores))
}

const crearId = () => {
  const jugadoresString = localStorage.getItem('jugadores')
  const listaId = jugadoresString ? JSON.parse(jugadoresString) : []
  let id = ''
  if (listaId.length == 0) {
    id = 0
  } else {
    id = parseInt(listaId.length)
  }
  return id
}

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML

const agregarJugador = async () => {
  try {
    // Solicitar al usuario que ingrese los datos del jugador
    const id = crearId()
    const nombre = prompt('Ingrese el nombre del jugador:')
    const edad = parseInt(prompt('Ingrese la edad del jugador:'))
    const posicion = prompt('Ingrese la posición del jugador:')
    let estado = prompt('Ingrese estado del jugador:')
    while (estado !== 'Titular' && estado !== 'Suplente') {
      alert('Solo puede elegir Titular o Suplente')
      estado = prompt('Ingrese estado del jugador:')
    }

    // Obtener los jugadores del localStorage
    const jugadores = obtenerJugadoresLocalStorage()

    if (!nombre || !edad || !posicion || !estado) {
      alert('No puede ingresar campos vacios. Reinicie la operacion')
    } else {
      // Verificar si el jugador ya existe en el equipo
      const jugadorExistente = jugadores.find(jugador => jugador.nombre.toLowerCase() === nombre.toLowerCase())

      if (jugadorExistente) {
        alert('El jugador ya está en el equipo.')
        throw new Error('El jugador ya está en el equipo.')
      } else {
        // Agregar el nuevo jugador al array de jugadores
        jugadores.push({ id, nombre, edad, posicion, estado })

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresLocalStorage(jugadores)

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mostrar un mensaje de éxito
        alert('Jugador agregado correctamente.')
      }
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// Funcion que crea li que se va a usar para mostrar elementos.
const crearItemJugador = (jugador) => {
  const item = document.createElement('li')
  item.classList.add('list-group-item')
  const DatosJugador = document.createElement('p')
  DatosJugador.textContent = `Id: ${jugador.id} - Nombre: ${jugador.nombre} - Edad: ${jugador.edad} - Posición: ${jugador.posicion} - Estado: ${jugador.estado}`

  item.appendChild(DatosJugador)

  return item
}

// Función asíncrona para listar todos los jugadores del equipo
const listaJugadores = document.getElementById('listaJugadores')
let estadoListaJugadores = 'inactivo'

const listarJugadores = async () => {
  // Implementación para listar todos los jugadores
  try {
    if (estadoListaJugadores === 'inactivo') {
      const jugadores = obtenerJugadoresLocalStorage()

      jugadores.forEach(itemJugador => {
        const jugador = crearItemJugador(itemJugador)
        listaJugadores.appendChild(jugador)
      })

      estadoListaJugadores = 'activa'
    } else if (estadoListaJugadores === 'activa') {
      const arrayListaJugadores = Array.from(listaJugadores.childNodes)
      arrayListaJugadores.forEach(jugador => {
        listaJugadores.removeChild(jugador)
      })
      estadoListaJugadores = 'inactivo'
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (idJugador, nuevaPosicion) => {
  // Implementación para asignar una nueva posición a un jugador.
  try {
    const jugadores = obtenerJugadoresLocalStorage()

    const jugadorModificado = jugadores.find((j) => j.id === idJugador)

    if (jugadorModificado) {
      jugadores[jugadorModificado.id].posicion = nuevaPosicion
    }

    guardarJugadoresLocalStorage(jugadores)
    listarJugadores()
  } catch (error) {
    console.error('Error:', error)
  }
}

const VerificarJugador = async (idJugador) => {
  const jugadores = obtenerJugadoresLocalStorage()
  const jugadorVerificado = jugadores.find((jugador) => jugador.id == idJugador)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (jugadorVerificado) {
        resolve(jugadorVerificado)
      } else {
        alert(`El jugador de ID ${idJugador} no existe`)
        reject(new Error(`El jugador ${idJugador} no existe`))
      }
    }, 1000)
  })
}

const VerificarEstado = async (jugador, estado, mje) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (jugador.estado == estado) {
        resolve(jugador)
      } else {
        alert(`${mje}`)
        reject(new Error(`El jugador debe ser ${estado}`))
      }
    }, 1000)
  })
}

const obtenerJugador = async (texto, estado, mje) => {
  const IdJugador = prompt(`Ingrese el ID de jugador que quiere ${texto}:`)
  // return new Promise( async (resolve, reject)  => { // Tengo que agregarle el async antes de los parametros.
  try {
    const jugador = await VerificarJugador(IdJugador)
    await VerificarEstado(jugador, estado, mje)
    const jugadores = obtenerJugadoresLocalStorage()
    return jugadores.find(jugador => jugador.id == IdJugador)
    // const resultado = jugadores.find(jugador => jugador.id == IdJugador)
    // resolve(resultado)
  } catch (error) {
    console.error('Error:', error)
    await obtenerJugador(texto, estado)
  }
  // }
  // )
}

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async (jugadorEntrante, jugadorSaliente) => {
  // Implementación para realizar un cambio durante un partido
  const jugadores = obtenerJugadoresLocalStorage()

  jugadores[jugadorEntrante.id].estado = 'Titular'
  jugadores[jugadorSaliente.id].estado = 'Suplente'
  alert(`MODIFICACION:
  --> INGRESA:  ${jugadorEntrante.nombre}
  <-- SALE:  ${jugadorSaliente.nombre}`)
  guardarJugadoresLocalStorage(jugadores)
  listarJugadores()
}

// Función principal asíncrona que interactúa con el usuario
const main = async () => {
  // Lógica para interactuar con el usuario y llamar a las funciones adecuadas
  const botoneraUsuario = document.getElementById('botoneraUsuario')
  botoneraUsuario.addEventListener('click', async evento => {
    if (evento.target.nodeName == 'BUTTON') {
      const clickUsuario = evento.target.textContent

      if (clickUsuario == 'Asignar posición') {
        try {
          const idJugador = prompt('Ingrese el ID de jugador cuya posicion quiere modificar:')
          const nuevaPosicion = prompt('Ingrese la nueva posicion:')

          asignarPosicion(parseInt(idJugador), nuevaPosicion)
        } catch (error) {
          console.error('Error:', error)
        }
      } else if (clickUsuario == 'Listar jugadores') {
        listarJugadores()
      } else if (clickUsuario == 'Realizar cambio durante el partido') {
        const idJugadorEntrante = await obtenerJugador('Ingresar', 'Suplente', 'El jugadror entrante debe ser un suplente')
        const idJugadorSustituido = await obtenerJugador('Sustituir', 'Titular', 'El jugadror saliente debe ser un titular')

        realizarCambio(idJugadorEntrante, idJugadorSustituido)
      }
    }
  })
}

// Llamar a la función principal para iniciar la aplicación
main()
