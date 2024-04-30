// Verificación de disponibilidad de usuario:
// Escribe un programa donde se ingrese un nombre de usuario y definir una función llamada
//  verificarDisponibilidadUsuario que usa ese parámetro como argumento y devuelva una promesa.
//   Esta promesa debe resolver si el nombre de usuario está disponible y guardar el nuevo usuario o
//   rechazar si el nombre de usuario ya está en uso.

const usuarios = ['marcelo', 'carlos', 'tomas', 'mauricio', 'sofia', 'gaston']

const usuarioForm = document.getElementById('formUsuario')

const verificarDisponibilidadUsuario = async (nuevoUsuario) => {
  return new Promise((resolve, reject) => {
    if (!usuarios.includes(nuevoUsuario)) {
      resolve(nuevoUsuario)
    } else {
      reject(new Error('El usuario ya existe'))
    }
  })
}

const agregarUsuario = async (e) => {
  e.preventDefault()

  const nuevoUsuario = usuarioForm.elements.usuario.value
  if (nuevoUsuario.trim() === '') {
    alert('El campo no puede estar vacío')
    return
  }

  try {
    const resultado = await verificarDisponibilidadUsuario(nuevoUsuario)
    usuarios.push(resultado)
    alert(`Se creó el usuario ${resultado}`)
  } catch (error) {
    alert('El usuario ya existe')
    console.error(error)
  }
}

usuarioForm.addEventListener('submit', agregarUsuario)
