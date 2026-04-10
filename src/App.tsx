import { useState } from 'react'
import type { Pagina } from './types'
import { Header } from './components'
import { AuthProvider, useAuth } from './auth'
import { cerrarSesion } from './services/auth.service'
import Dashboard from './pages/Dashboard'
import Tareas from './pages/Tareas'
import Reportes from './pages/Reportes'
import Proyectos from './pages/Proyectos'
import Login from './pages/Login'

function AppContenido() {
  const { estaAutenticado, cargando } = useAuth()
  const [paginaActual, setPaginaActual] = useState<Pagina>('dashboard')

  const manejarCerrarSesion = async () => {
    await cerrarSesion()
    setPaginaActual('dashboard')
    window.location.reload()
  }

  const renderizarPagina = () => {
    switch (paginaActual) {
      case 'dashboard':
        return <Dashboard />
      case 'tareas':
        return <Tareas />
      case 'reportes':
        return <Reportes />
      case 'proyectos':
        return <Proyectos />
      default:
        return <Dashboard />
    }
  }

  // Mostrar pantalla de carga
  if (cargando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  // Mostrar login si no está autenticado
  if (!estaAutenticado) {
    return <Login />
  }

  // Mostrar dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        paginaActual={paginaActual}
        onNavegar={setPaginaActual}
        onCerrarSesion={manejarCerrarSesion}
        cantidadNotificaciones={3}
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {renderizarPagina()}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContenido />
    </AuthProvider>
  )
}