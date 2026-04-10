import { useState } from 'react'
import { Input } from '../components/Input'
import { Boton } from '../components/Button'
import { loginConEmail } from '../services/auth.service'

export default function Login() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      await loginConEmail(correo, contrasena)
      // Recargar la página para mostrar el dashboard
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
      setCargando(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">DevTask</h1>
          <p className="mt-2 text-sm text-gray-500">Gestor de Proyectos y Tareas</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 border border-red-200">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="correo@ejemplo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            disabled={cargando}
            helperText="Usuarios demo: admin@devtask.local, manager@devtask.local, developer@devtask.local"
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            disabled={cargando}
          />

          <Boton
            type="submit"
            variante="primario"
            tamano="lg"
            anchoCompleto
            disabled={cargando}
          >
            {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Boton>
        </form>

        {/* Usuarios Demo */}
        <div className="mt-8 rounded-lg bg-blue-50 p-4 border border-blue-200">
          <p className="text-xs font-semibold text-blue-900 mb-3">USUARIOS DE PRUEBA:</p>
          <div className="space-y-2">
            <div>
              <p className="text-xs font-medium text-blue-900">Admin</p>
              <p className="text-xs text-blue-700 font-mono">admin@devtask.local</p>
            </div>
            <div>
              <p className="text-xs font-medium text-blue-900">Manager</p>
              <p className="text-xs text-blue-700 font-mono">manager@devtask.local</p>
            </div>
            <div>
              <p className="text-xs font-medium text-blue-900">Developer</p>
              <p className="text-xs text-blue-700 font-mono">developer@devtask.local</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}