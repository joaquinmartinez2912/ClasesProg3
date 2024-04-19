// Requisitos:
// El usuario debe poder eliminar tareas de la lista.
// El usuario debe poder marcar las tareas como completadas.
// El usuario debe poder ver todas las tareas pendientes y las completadas.
// Usar HTML Y css para adaptarlo a la web.
// Pueden utilizar librerias por ejemplo bootstrap, etc.

// El usuario debe poder agregar nuevas tareas a la lista.
const listaToDoEnProceso = document.getElementById('listaToDoEnProceso')
const listaToDoTerminadas = document.getElementById('listaToDoTerminadas')
const formTarea = document.getElementById('formTarea') // Levanto todo lo que esta en el formulario.

const agregarTarea = (e) => {
  e.preventDefault()
  const tarea = formTarea.elements.tarea.value // "tarea" es el id del "textarea".
  if (tarea !== '') { // Verificar si el textarea no está vacío
    const item = document.createElement('li')

    const p = document.createTextNode(tarea);
    const textoTarea = document.createElement('p')
    textoTarea.appendChild(p)

    const botonEliminar = document.createElement('button')
    botonEliminar.textContent = 'Eliminar' 
    botonEliminar.classList.add('btn', 'btn-danger', 'ml-5') // Agregar clases de Bootstrap al botón

    // Agregar un evento click al botón para eliminar la tarea
    botonEliminar.addEventListener('click', function () {
      item.remove() 
    })

    const botorFinalizar = document.createElement('button')
    botorFinalizar.textContent = 'Finalizar'
    botorFinalizar.classList.add('btn', 'btn-success', 'ml-5')

    botorFinalizar.addEventListener('click', function () {
      caja_uno.removeChild(botorFinalizar)
      listaToDoTerminadas.appendChild(item)
    })

    const caja_uno = document.createElement('div')
    caja_uno.id = "caja_uno"

    caja_uno.appendChild(botorFinalizar)
    caja_uno.appendChild(botonEliminar)

    item.appendChild(textoTarea)
    item.appendChild(caja_uno)

    listaToDoEnProceso.appendChild(item)
    formTarea.reset()
  }
}

formTarea.addEventListener('submit', agregarTarea) // Agrego la funcion al submit del formulario.

