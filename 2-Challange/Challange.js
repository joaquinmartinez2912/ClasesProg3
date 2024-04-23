// Requisitos:
// El usuario debe poder eliminar tareas de la lista.
// El usuario debe poder agregar nuevas tareas a la lista.
// El usuario debe poder marcar las tareas como completadas.
// El usuario debe poder ver todas las tareas pendientes y las completadas.
// Usar HTML Y css para adaptarlo a la web.
// Pueden utilizar librerias por ejemplo bootstrap, etc.

const listaToDoEnProceso = document.getElementById('listaToDoEnProceso')
const listaToDoTerminadas = document.getElementById('listaToDoTerminadas')
const formTarea = document.getElementById('formTarea') // Trae el submit del formulario.

// Para cargar las tareas que estan guardadas en localStorage.
const cargarTareas = () => {
  const tareasGuardadas = JSON.parse(localStorage.getItem('tareas'))

  tareasGuardadas.forEach(tarea => {
    const item = crearItemTarea(tarea.texto, tarea.completada)

    if (tarea.completada) {
      listaToDoTerminadas.appendChild(item)
    } else {
      listaToDoEnProceso.appendChild(item)
    }
  })
}

// Para guardar las tareas que estan guardadas en localStorage.
const guardarTareas = () => {
  const tareas = []

  listaToDoEnProceso.querySelectorAll('li').forEach(item => {
    const tareaText = item.querySelector('p').textContent
    tareas.push({ texto: tareaText, completada: false })
  })

  listaToDoTerminadas.querySelectorAll('li').forEach(item => {
    const tareaText = item.querySelector('p').textContent
    tareas.push({ texto: tareaText, completada: true })
  })

  localStorage.setItem('tareas', JSON.stringify(tareas))
}

// Para crear la estrucutra de HTML donde se van a guardar los objetos del localstorage.
const crearItemTarea = (texto, completada = false) => {
  const item = document.createElement('li')

  const textoTarea = document.createElement('p')
  textoTarea.textContent = texto

  const botonEliminar = document.createElement('button')
  botonEliminar.textContent = 'Eliminar'
  botonEliminar.classList.add('btn', 'btn-danger', 'ml-5')
  botonEliminar.addEventListener('click', () => {
    item.remove()
    guardarTareas()
  })

  const botonFinalizar = document.createElement('button')
  botonFinalizar.textContent = 'Finalizar'
  botonFinalizar.classList.add('btn', 'btn-success', 'ml-5')
  botonFinalizar.addEventListener('click', () => {
    listaToDoEnProceso.removeChild(item)
    listaToDoTerminadas.appendChild(item)
    contenedorBotones.removeChild(botonFinalizar)
    guardarTareas()
  })

  const contenedorBotones = document.createElement('div')
  contenedorBotones.id = 'caja_uno'
  if (completada) {
    contenedorBotones.appendChild(botonEliminar)
  } else {
    contenedorBotones.appendChild(botonFinalizar)
    contenedorBotones.appendChild(botonEliminar)
  }

  item.appendChild(textoTarea)
  item.appendChild(contenedorBotones)

  return item
}

const agregarTarea = (e) => {
  e.preventDefault()
  const tareaTexto = formTarea.elements.tarea.value

  if (tareaTexto !== '') {
    const nuevaTarea = crearItemTarea(tareaTexto)

    listaToDoEnProceso.appendChild(nuevaTarea)
    formTarea.reset()
    guardarTareas()
  }
}

formTarea.addEventListener('submit', agregarTarea)
window.addEventListener('load', cargarTareas)
