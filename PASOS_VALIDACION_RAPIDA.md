# ⚡ PASOS RÁPIDOS PARA VALIDAR LA IMPLEMENTACIÓN

## 1️⃣ BACKEND - Aplicar Trigger SQL

Ejecuta esto en tu cliente PostgreSQL (psql, PgAdmin, etc.):

```sql
-- Copia todo este bloque y ejecútalo
CREATE OR REPLACE FUNCTION check_goal_completion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.current_progress >= NEW.target THEN
    NEW.is_completed := TRUE;
    NEW.completed_at := NOW();
  ELSE
    NEW.is_completed := FALSE;
    NEW.completed_at := NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_goal_completion
BEFORE INSERT OR UPDATE ON goals_goal
FOR EACH ROW
EXECUTE FUNCTION check_goal_completion();
```

✅ Si ves "CREATE TRIGGER" sin errores, está listo.

---

## 2️⃣ FRONTEND - Verificar Archivos Creados

Comprueba que estos archivos existen:

```bash
# Desde la raíz del proyecto
ls zzzapp/src/goals/context/GoalsContext.tsx
ls zzzapp/src/home/hooks/useStepsGoal.ts
ls zzzapp/src/goals/components/UpdateProgressModal.tsx
```

**Resultado esperado:** Todos los archivos existen sin errores.

---

## 3️⃣ FRONTEND - Verificar Imports en App.tsx

Abre `App.tsx` y confirma:

```tsx
import { GoalsProvider } from './src/goals/context/GoalsContext';

// Y que la estructura sea:
<AuthProvider>
  <GoalsProvider>
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  </GoalsProvider>
</AuthProvider>
```

✅ Si está así, los providers están correctos.

---

## 4️⃣ EJECUTAR TESTS MANUALES

### Test 1: Ver datos dinámicos en HomeScreen

```bash
# En la terminal de desarrollo
npm start
# o expo start
```

1. Abre la app
2. Ve a HomeScreen
3. Deberías ver "Pasos Hoy" con:
   - ✅ Número de pasos (no 6420)
   - ✅ Meta de pasos (desde la API)
   - ✅ Porcentaje calculado

### Test 2: Actualizar progreso en GoalsScreen

1. Ve a GoalsScreen
2. Busca una meta de pasos (categoría: "steps")
3. Presiona el botón verde "+" (junto al lápiz)
4. Ingresa un nuevo valor (ej: suma 500 pasos)
5. Presiona "Guardar"

**Esperado:**
- ✅ Modal se cierra
- ✅ Verás el progreso actualizado en la card
- ✅ Si vuelves a HomeScreen, StepsCard se actualiza automáticamente

### Test 3: Completar una meta

1. En GoalsScreen, abre modal de actualizar progreso
2. Ingresa un valor >= que la meta
3. Antes de guardar, deberías ver "¡Meta completada!"
4. Presiona "Guardar"

**Esperado:**
- ✅ Meta marca como "Completada" en verde
- ✅ Barra de progreso 100%
- ✅ El botón "+" desaparece
- ✅ En BD: `is_completed = TRUE`, `completed_at = [fecha actual]`

---

## 5️⃣ VALIDAR EN BASE DE DATOS

Ejecuta esto en PostgreSQL:

```sql
-- Ver todas las metas con su estado
SELECT id, title, category, current_progress, target, is_completed, completed_at
FROM goals_goal
WHERE category = 'steps'
ORDER BY updated_at DESC
LIMIT 5;
```

**Resultado esperado:**
- `is_completed` = TRUE si `current_progress >= target`
- `completed_at` tiene fecha/hora si está completada

---

## 6️⃣ VALIDAR LOGS (CONSOLE)

En la consola de React Native, deberías ver:

```
✅ "Total de metas cargadas: 5"
✅ "Error al obtener meta de pasos:" (solo si hay error, está bien)
✅ Sin errores de import o undefined variables
```

---

## ✅ CHECKLIST FINAL

- [ ] Trigger SQL aplicado en PostgreSQL
- [ ] Archivos creados existen
- [ ] GoalsProvider en App.tsx
- [ ] StepsCard muestra datos dinámicos
- [ ] Botón "+" aparece en metas
- [ ] Modal se abre y guarda correctamente
- [ ] HomeScreen se actualiza automáticamente
- [ ] Trigger marca metas como completadas
- [ ] No hay errores en la consola

---

## 🆘 AYUDA RÁPIDA

### Si StepsCard muestra "Cargando pasos..." indefinidamente:
```bash
# 1. Crea una meta de pasos si no existe
# 2. Verifica el endpoint en la consola
# 3. Comprueba que goalsService.getUserGoals() funciona
```

### Si el botón "+" no aparece:
```bash
# Verifica en GoalCard.tsx que el prop onUpdateProgress esté siendo pasado
# Ve a GoalsScreen y asegúrate que handleUpdateProgress está definida
```

### Si el modal no actualiza:
```bash
# Comprueba que /goals/{id}/update_progress/ existe en tu backend
# Verifica que el endpoint aceiona POST
# Revisa el token de autenticación
```

---

## 📞 NOTAS IMPORTANTES

- El trigger se ejecuta **automáticamente** en la BD
- No necesitas reiniciar el backend
- Los cambios son **instantáneos**
- La sincronización usa el Context (no Redux)
- El StepsCard mantiene su diseño, solo son dinámicos los datos

---

¡Listo! Sigue estos pasos y todo debería funcionar perfectamente. 🚀
