# Guía de Contribución - Gestión de Configuración

## Proceso de Contribución

Esta guía describe el proceso formal para proponer, revisar y aplicar cambios a los archivos de configuración del proyecto.

## Flujo de Trabajo

### Fase 1: Preparación y Creación de Rama

#### Paso 1.1: Crear una rama con el formato específico

Antes de hacer cambios, crea una rama con el siguiente formato:

```bash
git checkout -b config/<descripcion>
```

**Ejemplos válidos:**
- `config/update-db-host-staging`
- `config/enable-analytics-production`
- `config/reduce-api-timeout-development`
- `config/add-new-feature-flag`

**Convenciones:**
- Usar prefijo `config/` obligatoriamente
- Descripción en minúsculas
- Separar palabras con guiones (kebab-case)
- Descripción concisa (máximo 50 caracteres después del prefijo)

#### Paso 1.2: Realizar cambios en los archivos de configuración

Edita los archivos JSON en la carpeta `config/` necesarios:
- `development.json`
- `staging.json`
- `production.json`

**Reglas:**
- Valores deben ser coherentes entre entornos
- Mantener la estructura JSON válida
- No eliminar parámetros existentes
- Documentar cambios complejos

### Fase 2: Validación Local

Antes de pushear cambios:

#### Paso 2.1: Validar sintaxis JSON

```bash
# En Windows PowerShell
$json = Get-Content "config/development.json" | ConvertFrom-Json
# Si no hay error, la sintaxis es válida
```

O con Node.js:
```bash
node -e "console.log(JSON.parse(require('fs').readFileSync('config/development.json', 'utf-8')))"
```

#### Paso 2.2: Verificar coherencia

- ✓ Parámetros requeridos completados
- ✓ Tipos de datos correctos
- ✓ Valores lógicos para cada ambiente
- ✓ Feature flags consistentes

### Fase 3: Commit y Push

```bash
# Commit descriptivo
git add config/
git commit -m "config: descripción clara del cambio"

# Push a la rama remota
git push origin config/<descripcion>
```

**Formato de commit:**
```
config: [brief description]

[Optional detailed explanation of changes]
[Impact on different environments]
```

**Ejemplo:**
```
config: enable advanced reporting in staging

- Enable ENABLE_ADVANCED_REPORTING flag in staging.json
- Increase API_TIMEOUT to 45s for complex queries
- Keep feature disabled in development for testing
- Approved by performance team

Fixes #123
```

### Fase 4: Creación del Pull Request

Después de hacer push, crear un Pull Request con:

**Título:**
```
[CONFIG] Brief description of changes
```

**Descripción del PR (incluir esta plantilla):**

```markdown
## Descripción del Cambio
- Breve explicación de qué se modificó
- Por qué se requiere este cambio
- Impacto esperado

## Archivos Modificados
- [ ] development.json
- [ ] staging.json
- [ ] production.json

## Cambios Específicos
Detallar cada cambio línea por línea:

### En staging.json
- `ENABLE_ADVANCED_REPORTING`: false → true
- `API_TIMEOUT`: 30000 → 45000

## Validación
- [ ] Sintaxis JSON validada
- [ ] Valores coherentes entre entornos
- [ ] Parámetros obligatorios presentes
- [ ] Cambios documentados

## Aprobaciones Requeridas
- [ ] Code Review completado
- [ ] Cambio aprobado antes de merge
```

## Proceso de Revisión

### Requisitos Mínimos

1. **Al menos un revisor**: Debe ser una persona diferente al autor
2. **Validación de contenido**: Verificar que los cambios son coherentes
3. **Testing**: Si aplica, validar en ambiente de staging

### Responsabilidades del Revisor

El revisor debe verificar:

#### Validaciones Técnicas
- ✓ Sintaxis JSON válida
- ✓ Estructura correcta (no hay parámetros faltantes)
- ✓ Tipos de datos correctos
- ✓ Sin valores duplicados innecesarios

#### Validaciones de Negocio
- ✓ Cambios coherentes entre ambientes
- ✓ Feature flags habilitados en el ambiente correcto
- ✓ Impacto bien documentado
- ✓ Sin cambios que afecten negativamente production

#### Documentación
- ✓ Descripción clara del cambio
- ✓ Razón del cambio explicada
- ✓ Impacto identificado

### Checklist para el Revisor

```markdown
## Validación de Estructura
- [ ] Syntax JSON válida
- [ ] Todos los parámetros requeridos presentes
- [ ] Tipos de datos son correctos
- [ ] Formato de nomenclatura correcto (UPPER_SNAKE_CASE)

## Validación de Coherencia
- [ ] Valores tienen sentido para el entorno
- [ ] Feature flags están en el ambiente apropiado
- [ ] Base de datos hosts son consistentes
- [ ] Ports están en rango válido

## Validación de Documentación
- [ ] Cambio tiene descripción clara
- [ ] Razón/motivación está documentada
- [ ] Impacto es claro
- [ ] Sin cambios ocultos o inesperados

## Aprobación
- [ ] Apruebo el cambio
- [ ] El cambio está listo para production
```

### Aprobación o Solicitud de Cambios

**Para aprobar:**
```
Approved ✓

Los cambios son coherentes y están bien documentados.
```

**Para solicitar cambios:**
```
Changes requested

Línea 5: El valor de DB_PORT debe ser 5432 en todos los ambientes
Línea 12: ENABLE_BULK_OPERATIONS debe estar deshabilitado en staging
```

## Criterios de Aceptación

El cambio será aceptado cuando cumpla con:

| Criterio | Descripción |
|----------|-------------|
| **Sintaxis válida** | Archivos JSON parsean sin errores |
| **Estructura completa** | Todos los parámetros requeridos están presentes |
| **Coherencia** | Valores son lógicos para cada ambiente |
| **Documentación clara** | Cambio está bien explicado |
| **Revisión completada** | Al menos un revisor aprobó |
| **Sin conflictos** | Merge sin conflictos a main |

## Merge y Finalización

Una vez aprobado:

```bash
# El revisor ejecuta (o autoriza)
git checkout main
git pull origin main
git merge config/<descripcion>
git push origin main

# O usar GitHub UI: Click "Squash and merge" or "Merge pull request"
```

**Post-merge:**
1. ✓ Verificar que CI/CD pasa exitosamente
2. ✓ Monitorear ambiente staging si hubo cambios
3. ✓ Documentar en el changelog si corresponde

## Ejemplos de Cambios Válidos

### Ejemplo 1: Agregar un Feature Flag

```json
{
  "FEATURE_FLAGS": {
    "ENABLE_ANALYTICS": false,
    "ENABLE_ADVANCED_REPORTING": false,
    "ENABLE_BULK_OPERATIONS": false,
    "ENABLE_API_LOGGING": true,
    "ENABLE_NEW_DASHBOARD": false
  }
}
```

**Rama:** `config/add-new-dashboard-flag`
**Cambio:** Agregar `ENABLE_NEW_DASHBOARD` en todos los ambientes

### Ejemplo 2: Aumentar Timeout en Production

```json
{
  "API_TIMEOUT": 60000
}
```

**Rama:** `config/increase-timeout-production`
**Cambio:** `API_TIMEOUT`: 45000 → 60000

### Ejemplo 3: Cambiar DB Host en Staging

```json
{
  "DB_HOST": "new-staging-db.internal"
}
```

**Rama:** `config/update-staging-db-host`
**Cambio:** Migración a nuevo servidor de base de datos

## Resolución de Conflictos

Si hay conflictos al hacer merge:

```bash
# Resolver conflictos manualmente
# Los conflictos en config files suelen necesitar decisión manual

git status  # Identificar archivos en conflicto
# Editar archivos
git add config/
git commit -m "Resolver conflicto de merge"
git push
```

## Rollback

Si un cambio causa problema en production:

```bash
# Revertir último commit
git revert HEAD

# O crear rama con configuración anterior
git checkout config/rollback-<descripcion>
```

## Historial y Auditoría

Todos los cambios quedan registrados en:

```bash
git log --oneline config/
# Ver todos los cambios de configuración

git show <commit-hash>
# Ver detalles de un cambio específico
```

## Mejores Prácticas

1. ✓ Un cambio = un PR (evitar mezclar múltiples cambios)
2. ✓ Cambios pequeños y frecuentes son mejores que grandes
3. ✓ Siempre documentar la razón del cambio
4. ✓ Considerar impacto en todos los ambientes
5. ✓ Validar cambios antes de push
6. ✓ Solicitar revisión a alguien familiarizado con el entorno
7. ✓ Esperar aprobación antes de hacer merge
8. ✓ Monitorear después de deployment

## Contacto y Ayuda

Para preguntas sobre la configuración o el proceso:

- Revisar [README.md](./README.md) para entender la estructura
- Contactar al tech lead del equipo
- Abrir una issue si hay problema con la configuración actual
