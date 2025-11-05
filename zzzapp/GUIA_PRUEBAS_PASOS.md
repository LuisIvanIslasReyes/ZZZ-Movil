## 🧪 GUÍA DE PRUEBAS - SINCRONIZACIÓN DE PASOS EN TIEMPO REAL

### 📱 ESCENARIO DE PRUEBA 1: Ver datos dinámicos en StepsCard

**Pasos:**
1. Asegúrate de tener una meta de pasos creada (categoría: `steps`)
2. Abre la app → Ve a HomeScreen
3. Deberías ver el componente "Pasos Hoy" mostrando:
   - ✅ Cantidad de pasos actual (desde la API)
   - ✅ Meta de pasos (desde la API)
   - ✅ Porcentaje calculado automáticamente

**Resultado esperado:**
- Los valores NO son estáticos (como antes: 6420 / 8000)
- Los valores coinciden con los de tu base de datos
- El indicador de carga aparece brevemente al abrir

---

### 📱 ESCENARIO DE PRUEBA 2: Actualizar progreso con modal

**Pasos:**
1. Ve a GoalsScreen (pantalla de Metas)
2. Busca tu meta de pasos
3. Presiona el botón **verde con icono "+"** (debe estar junto al lápiz)
4. Se abre el modal "Actualizar Progreso"
5. Ingresa un nuevo valor de pasos (ej: 1000 más que el actual)
6. Presiona "Guardar"

**Resultado esperado:**
- ✅ Modal se cierra tras guardar
- ✅ Aparece alerta "Éxito - Progreso actualizado correctamente"
- ✅ La meta en GoalsScreen refleja el nuevo progreso
- ✅ **IMPORTANTE:** Si vuelves a HomeScreen, StepsCard muestra el nuevo progreso

---

### 📱 ESCENARIO DE PRUEBA 3: Completar una meta (Trigger BD)

**Pasos:**
1. Ve a GoalsScreen
2. Abre el modal de actualizar progreso de la meta de pasos
3. Ingresa un valor **mayor o igual** a la meta
4. Presiona "Guardar"

**Resultado esperado:**
- ✅ En el modal, antes de guardar, verás alerta: "¡Meta completada!"
- ✅ Tras guardar, la meta en GoalsScreen muestra:
  - Estado: "Completada" (en verde)
  - Barra 100%
- ✅ El botón "+" desaparece (solo metas en progreso lo muestran)
- ✅ En la BD, el trigger automáticamente:
  - `is_completed = TRUE`
  - `completed_at = [fecha/hora actual]`

---

### 🔄 ESCENARIO DE PRUEBA 4: Sincronización en tiempo real

**Pasos:**
1. Abre dos pantallas lado a lado (simulación):
   - Pantalla A: HomeScreen (StepsCard visible)
   - Pantalla B: GoalsScreen (meta de pasos visible)
2. En GoalsScreen, presiona "+" en la meta de pasos
3. Actualiza el progreso a un valor mayor
4. Presiona "Guardar" y espera a que se cierre el modal
5. Ve nuevamente a HomeScreen / actualiza

**Resultado esperado:**
- ✅ StepsCard en HomeScreen muestra el nuevo progreso
- ✅ El porcentaje actualizado
- ✅ Sin necesidad de recargar manualmente

---

## 🐛 TROUBLESHOOTING

### Problema: StepsCard muestra "Cargando pasos..." indefinidamente

**Soluciones:**
1. Verifica que hayas creado una meta de pasos (categoría = `steps`)
2. Asegúrate que el endpoint `/goals/` responde correctamente
3. Revisa la consola del app para errores

### Problema: El botón "+" no aparece

**Soluciones:**
1. Verifica que la meta **NO esté completada** (`is_completed = false`)
2. Verifica que el prop `onUpdateProgress` esté siendo pasado correctamente
3. Revisa los cambios en `GoalCard.tsx`

### Problema: Al presionar "Guardar", no pasa nada

**Soluciones:**
1. Verifica que el endpoint `/goals/{id}/update_progress/` exista
2. Revisa la consola para errores de red
3. Asegúrate de que el token de autenticación sea válido

### Problema: StepsCard no se actualiza después de guardar

**Soluciones:**
1. Verifica que `GoalsProvider` esté envolviendo la app en `App.tsx`
2. Revisa que `useStepsGoal` está llamando a `useGoalsRefresh()`
3. Verifica el `refreshGoalsFlag` en el contexto

---

## 📊 DATOS DE PRUEBA (RECOMENDADOS)

Crea estas metas para pruebas:

```json
{
  "title": "Pasos Diarios",
  "category": "steps",
  "target": "3000",
  "unit": "Pasos",
  "current_progress": "1500",
  "start_date": "2025-11-05",
  "end_date": "2025-12-05"
}
```

---

## ✅ CHECKLIST FINAL

- [ ] StepsCard muestra datos dinámicos
- [ ] El porcentaje se calcula correctamente
- [ ] Botón "+" aparece en metas de pasos
- [ ] Modal se abre y cierra correctamente
- [ ] Actualizar progreso guarda en BD
- [ ] Trigger marca meta como completada
- [ ] HomeScreen se actualiza automáticamente
- [ ] No hay errores en la consola
- [ ] Los valores coinciden entre pantallas

---

## 📝 NOTAS

- El hook `useStepsGoal` tarda ~500ms en obtener datos (dependiendo de la red)
- El trigger de BD es instantáneo, no hay lag
- La sincronización usa Context, no Redux (más simple)
- El modal es un bottom sheet elegante (React Native API Modal)

---

¡Listo para probar! 🚀
