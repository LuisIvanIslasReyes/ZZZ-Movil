## 📱 IMPLEMENTACIÓN: SINCRONIZACIÓN DE METAS EN TIEMPO REAL

### 🎯 Objetivo
Sincronizar automáticamente el componente `StepsCard` del `HomeScreen` con la meta de pasos del usuario. Cuando se actualiza el progreso de una meta, el contador de pasos se refresca en tiempo real.

---

## 📋 Archivos Creados/Modificados

### 1. **`zzzapp/src/goals/context/GoalsContext.tsx`** ✨ [NUEVO]
**Propósito:** Context global para sincronizar cambios en metas entre múltiples pantallas.

**Funcionalidad:**
- `GoalsProvider`: Proveedor que envuelve la app
- `useGoalsRefresh()`: Hook que retorna `refreshGoalsFlag` y `triggerGoalsRefresh()`
- Cuando se actualiza una meta, se incrementa el flag para disparar actualizaciones

---

### 2. **`zzzapp/src/home/hooks/useStepsGoal.ts`** ✨ [NUEVO]
**Propósito:** Hook personalizado que obtiene dinámicamente el progreso de pasos del usuario.

**Funcionalidad:**
- Busca metas de categoría `'steps'` que NO estén completadas
- Retorna: `currentSteps`, `targetSteps`, `progressPercentage`, `isLoading`, `error`, `refetch()`
- **Se refresca automáticamente** cuando cambia el `refreshGoalsFlag` del contexto
- Manejo de errores y valores por defecto

---

### 3. **`zzzapp/src/home/components/StepsCard.tsx`** 🔄 [MODIFICADO]
**Antes:** Mostraba valores estáticos (6420 pasos, 8000 meta)
**Después:** Dinámico, obtiene datos reales de la API

**Cambios:**
- Importa `useStepsGoal` hook
- Obtiene `currentSteps`, `targetSteps`, `progressPercentage` de manera dinámica
- Muestra un indicador de carga mientras se obtienen los datos
- El porcentaje se calcula automáticamente
- **No cambió la estructura visual** - mantiene los mismos labels "Pasos Hoy", meta y porcentaje

---

### 4. **`zzzapp/src/goals/components/UpdateProgressModal.tsx`** ✨ [NUEVO]
**Propósito:** Modal para actualizar el progreso de una meta de forma elegante.

**Características:**
- Input numérico para ingresar el nuevo progreso
- Muestra el progreso actual y la meta lado a lado
- Alerta visual cuando la meta se completa
- Integración con `useGoalsRefresh()` para disparar refresco automático
- Cierra automáticamente después de guardar exitosamente

---

### 5. **`zzzapp/src/goals/components/GoalCard.tsx`** 🔄 [MODIFICADO]
**Cambios:**
- Agregado prop `onUpdateProgress?: (goal: Goal) => void`
- Botón verde con icono `plus-circle` para actualizar progreso
- Solo visible si la meta NO está completada
- Reorganizados botones en `headerActions` (actualizar + editar)

---

### 6. **`zzzapp/src/goals/screens/GoalsScreen.tsx`** 🔄 [MODIFICADO]
**Cambios:**
- Importa `UpdateProgressModal`
- Estados: `updateProgressModalVisible`, `selectedGoal`
- Nuevo handler: `handleUpdateProgress(goal)`
- Renderiza el `UpdateProgressModal` con los props necesarios
- Recarga metas al cerrar el modal exitosamente

---

### 7. **`zzzapp/App.tsx`** 🔄 [MODIFICADO]
**Cambios:**
- Importa `GoalsProvider` del contexto
- Envuelve `NavigationContainer` con `GoalsProvider`
```tsx
<AuthProvider>
  <GoalsProvider>
    <NavigationContainer>
      ...
    </NavigationContainer>
  </GoalsProvider>
</AuthProvider>
```

---

## 🔄 FLUJO DE SINCRONIZACIÓN

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Usuario abre HomeScreen                                  │
│    └─> StepsCard monta                                      │
│        └─> useStepsGoal.ts se ejecuta                       │
│            └─> Obtiene meta de pasos de la API              │
│                └─> Muestra pasos actuales, meta, porcentaje │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Usuario va a GoalsScreen                                 │
│    └─> Presiona botón "+" en meta de pasos                  │
│        └─> Se abre UpdateProgressModal                      │
│            └─> Ingresa nuevo progreso                       │
│                └─> Presiona "Guardar"                       │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Backend actualiza la meta                                │
│    └─> Trigger de BD marca is_completed = true si progreso │
│        alcanza la meta                                       │
│    └─> API retorna goal actualizado                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. UpdateProgressModal:                                     │
│    └─> Llama triggerGoalsRefresh() del contexto             │
│        └─> Incrementa refreshGoalsFlag                      │
│            └─> GoalsScreen recarga metas                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. StepsCard (HomeScreen):                                  │
│    └─> El hook useStepsGoal detecta cambio en               │
│        refreshGoalsFlag (dependencia en useEffect)          │
│        └─> Refresca datos de la API                         │
│            └─> Actualiza currentSteps, targetSteps,         │
│                progressPercentage                           │
│                └─> UI se refresca AUTOMÁTICAMENTE           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 VISUAL

### HomeScreen - StepsCard (Dinámico)
```
┌─────────────────────────────────┐
│ Pasos Hoy              ⏳        │ ← Cargando / Mostrando datos reales
│ [actual pasos]                  │ ← Dinámico desde API
│ Meta: [meta pasos]              │ ← Dinámico desde API
│                      [porcentaje]%│ ← Calculado automáticamente
└─────────────────────────────────┘
```

### GoalsScreen - GoalCard (con botón +)
```
┌─────────────────────────────────┐
│ 🚶 Meta Pasos    [+] [✏️]       │ ← + para actualizar, ✏️ para editar
│ [En progreso]                   │
│ [actual] / [meta] Pasos  [%]%   │
│ ████░░░ 45%                     │
└─────────────────────────────────┘
```

### UpdateProgressModal (Bottom Sheet)
```
┌─────────────────────────────────┐
│ Actualizar Progreso          [×] │
├─────────────────────────────────┤
│ Meta Pasos  [steps]             │
│ ┌─────────────┬─────────────┐   │
│ │ Prog. Actual│ Meta        │   │
│ │ 1544 Pasos  │ 3000 Pasos  │   │
│ └─────────────┴─────────────┘   │
│ Nuevo Progreso                  │
│ ┌──────────────────────────┐    │
│ │ 2000            Pasos    │    │
│ └──────────────────────────┘    │
│ ✓ ¡Meta completada!             │ ← Si progreso >= meta
│ [Cancelar]  [Guardar]           │
└─────────────────────────────────┘
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- ✅ Context de metas creado
- ✅ Hook useStepsGoal creado (dinámico)
- ✅ StepsCard actualizado (dinámico, sin cambios visuales)
- ✅ UpdateProgressModal creado (elegante)
- ✅ GoalCard actualizado (botón + para actualizar)
- ✅ GoalsScreen integrado (modal funcional)
- ✅ App.tsx envuelto con GoalsProvider
- ✅ Sincronización en tiempo real

---

## 🚀 CÓMO USAR

1. **Desde HomeScreen:** 
   - Ve al HomeScreen y verás "Pasos Hoy" con datos reales de tu meta de pasos

2. **Desde GoalsScreen:**
   - Presiona el botón "+" verde en la meta de pasos
   - Ingresa el nuevo progreso
   - Presiona "Guardar"
   - El HomeScreen se actualiza automáticamente

3. **Cambios de Meta:**
   - Cualquier actualización dispara el refresh automático
   - El porcentaje se calcula y muestra en tiempo real
   - Si completaste la meta, lo verás reflejado en ambas pantallas

---

## 🔐 BACKEND - TRIGGER SQL

El trigger en PostgreSQL asegura que:
- `is_completed` se actualice a `true` automáticamente cuando `current_progress >= target`
- `completed_at` se establezca con la hora actual
- Esto ocurre sin importar desde dónde se actualice (API, admin, scripts)

**Archivo:** `backend/triggerbd.txt` (ya existe)

---

## 📌 NOTAS IMPORTANTES

- El StepsCard **mantiene su apariencia visual**, solo ahora es dinámico
- Los porcentajes se calculan automáticamente
- La sincronización usa un Context para evitar llamadas innecesarias
- El modal se cierra automáticamente tras actualizar exitosamente
- Si no hay meta de pasos activa, muestra 0 pasos con meta 8000 por defecto

---

## 🎯 PRÓXIMOS PASOS (Opcional)

1. Agregar animación de actualización al StepsCard
2. Notificaciones locales cuando se completa una meta
3. Historial de cambios en el progreso
4. Edición en línea del progreso en el GoalCard
