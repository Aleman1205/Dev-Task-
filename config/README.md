# Configuración de la Aplicación - Dashboard for Oracle Project

## Estructura de Configuración

La carpeta `config/` contiene los archivos de configuración para los diferentes entornos de ejecución de la aplicación. Cada archivo JSON define los parámetros específicos para su respectivo entorno.

### Archivos de Configuración

- **development.json** - Configuración para desarrollo local
- **staging.json** - Configuración para ambiente de pruebas
- **production.json** - Configuración para ambiente de producción

## Formato de los Archivos

Los archivos de configuración utilizan formato **JSON** para facilitar la lectura, validación y procesamiento programático.

### Estructura Base

Cada archivo de configuración contiene los siguientes parámetros:

```json
{
  "APP_NAME": "string",
  "PORT": "number",
  "ENVIRONMENT": "string",
  "DB_HOST": "string",
  "DB_PORT": "number",
  "DEBUG": "boolean",
  "FEATURE_FLAGS": "object",
  "LOG_LEVEL": "string",
  "API_TIMEOUT": "number",
  "CACHE_ENABLED": "boolean"
}
```

## Descripción de Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `APP_NAME` | string | Nombre de la aplicación |
| `PORT` | number | Puerto en el que escucha la aplicación |
| `ENVIRONMENT` | string | Nombre del entorno (development, staging, production) |
| `DB_HOST` | string | Host o dirección IP del servidor de base de datos |
| `DB_PORT` | number | Puerto del servidor de base de datos |
| `DEBUG` | boolean | Modo de depuración habilitado (solo en development) |
| `FEATURE_FLAGS` | object | Conjunto de banderas para habilitar/deshabilitar características |
| `LOG_LEVEL` | string | Nivel de detalle en los logs (debug, info, warn, error) |
| `API_TIMEOUT` | number | Tiempo máximo de espera para llamadas API (ms) |
| `CACHE_ENABLED` | boolean | Habilitar o deshabilitar cache |

### Feature Flags

Los feature flags permiten activar/desactivar características sin redeployer el código:

- `ENABLE_ANALYTICS` - Análisis y métricas de uso
- `ENABLE_ADVANCED_REPORTING` - Reportes avanzados y KPIs
- `ENABLE_BULK_OPERATIONS` - Operaciones en lote
- `ENABLE_API_LOGGING` - Registro detallado de llamadas API

## Convenciones de Nomenclatura

- **Nombres de parámetros**: MAYÚSCULAS_CON_GUIONES_BAJOS (UPPER_SNAKE_CASE)
- **Valores booleanos**: true/false (sin comillas)
- **Valores numéricos**: sin comillas
- **Valores de texto**: entre comillas dobles

## Diferencias entre Entornos

### Development
- Debug habilitado para facilitar desarrollo
- Cache deshabilitado para cambios inmediatos
- Feature flags parcialmente habilitados
- Timeout corto (30s) para detección rápida de errores
- Base de datos local

### Staging
- Debug deshabilitado
- Cache habilitado para simular producción
- Most feature flags habilitados excepto operaciones en lote
- Timeout moderado (45s)
- Base de datos de staging

### Production
- Todas las características activas
- Debug completamente deshabilitado
- API logging deshabilitado por rendimiento
- Timeout máximo (60s)
- Base de datos de producción

## Ejemplo de Uso

### En Backend (Node.js/TypeScript)

```javascript
import * as fs from 'fs';

// Cargar configuración según entorno
const environment = process.env.NODE_ENV || 'development';
const config = JSON.parse(
  fs.readFileSync(`./config/${environment}.json`, 'utf-8')
);

// Acceder a parámetros
const port = config.PORT;
const dbHost = config.DB_HOST;
const isAnalyticsEnabled = config.FEATURE_FLAGS.ENABLE_ANALYTICS;
```

### En Frontend (React/TypeScript)

```typescript
// Configuración publicada en variables de entorno
const config = {
  API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 30000,
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development'
};
```

## Validación de Configuración

Todos los archivos de configuración deben:

1. ✓ Ser válidos según la sintaxis JSON
2. ✓ Contener todos los parámetros requeridos
3. ✓ Mantener tipos de datos consistentes
4. ✓ Tener valores coherentes para cada ambiente

## Carga de Configuración en la Aplicación

La configuración se carga al iniciar la aplicación basándose en la variable de entorno `NODE_ENV`:

```
NODE_ENV=development → config/development.json
NODE_ENV=staging → config/staging.json
NODE_ENV=production → config/production.json
```

---

Para información sobre cómo contribuir cambios a la configuración, consulta [CONTRIBUTING.md](./CONTRIBUTING.md).
