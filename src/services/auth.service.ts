import { usuarioActualInicialMock, usuariosMock } from '../mocks/users.mock'
import type { RolUsuario, Usuario } from '../types'

let usuarioActualDB: Usuario | null = usuarioActualInicialMock

const clonarUsuario = (usuario: Usuario | null): Usuario | null => (usuario ? { ...usuario } : null)

export const obtenerUsuarioActual = async (): Promise<Usuario | null> => {
  return Promise.resolve(clonarUsuario(usuarioActualDB))
}

export const obtenerUsuarios = async (): Promise<Usuario[]> => {
  return Promise.resolve(usuariosMock.map((u) => ({ ...u })))
}

export const cambiarRolDemo = async (rol: RolUsuario): Promise<Usuario> => {
  const usuarioEncontrado = usuariosMock.find((usuario) => usuario.rol === rol)

  if (usuarioEncontrado) {
    usuarioActualDB = { ...usuarioEncontrado }
    return Promise.resolve({ ...usuarioActualDB })
  }

  if (!usuarioActualDB) {
    throw new Error('No hay usuario activo')
  }

  usuarioActualDB = {
    ...usuarioActualDB,
    rol,
  }

  return Promise.resolve({ ...usuarioActualDB })
}

export const cambiarUsuarioActualDemo = async (usuarioId: string): Promise<Usuario> => {
  const usuarioEncontrado = usuariosMock.find((usuario) => usuario.id === usuarioId)

  if (!usuarioEncontrado) {
    if (!usuarioActualDB) {
      throw new Error('Usuario no encontrado')
    }
    return Promise.resolve({ ...usuarioActualDB })
  }

  usuarioActualDB = { ...usuarioEncontrado }
  return Promise.resolve({ ...usuarioActualDB })
}

export const loginConEmail = async (correo: string, _contrasena: string): Promise<Usuario> => {
  const usuarioEncontrado = usuariosMock.find((usuario) => usuario.correo.toLowerCase() === correo.toLowerCase() && usuario.activo)

  if (!usuarioEncontrado) {
    throw new Error('Usuario no encontrado o inactivo')
  }

  usuarioActualDB = { ...usuarioEncontrado }
  return Promise.resolve({ ...usuarioActualDB })
}

export const cerrarSesion = async (): Promise<void> => {
  usuarioActualDB = null
  return Promise.resolve()
}