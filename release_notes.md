### 0.1.0

- Primera versión beta de la aplicación
- Módulo de autenticación: inicia sesión, regístrate o recupera tu contraseña
- Módulo de administrador: Ve tus pacientes, administra sus datos, configura ejercicios y citas
- Módulo de paciente: Ve tus datos, tus fotos, tus ejercicios, tu dieta y tus citas

### 0.1.1

- Se añade uso de tráfico no seguro para pruebas abiertas (provisional)

### 0.2.0

- Se añade archivo de notas de la revisión
- Se añade componente de conteo de pasos en perfil del paciente
- Se añade solicitud de permisos de monitoreo de actividad
- Se añade integración con Google Fit para el conteo de pasos
- Se añade pantalla `Acerca de`
- Se añade pantalla `Notas de la versión`
- Se mejora la inicialización de `TabNavigation` al cargar
- Se mejora el proceso de carga de un paciente en el módulo de administrador
- Se añade nuevo ícono de aplicación y se actualiza el splash screen
- El administrador ya puedo subir la dieta de cada paciente

### 0.3.0

- Se modifica splashscreen para mostrar una frase motivacional al azar
- Se añade vista de detalles de ejercicio, incluyendo un video muestra si está disponible
- Sincronización de pasos entre usuario Paciente y usuario Administrador

### 0.4.0

- Se modifica la galería para mostrar y subir fotografías categorizadas

### 0.4.1

- Se añade evento `didPress` al componente `HorizontalDateSelector` para permitir hacer scroll automático en el calendario:
  - Citas (Admin)
  - Citas (Paciente)
- Se modifica uso de fechas con `moment` para manejo de zonas horarias

### 0.5.0

- Se mejora la experiencia de visualización de fotos desde la galería. Ahora eres capáz de acercar, alejar y moverte entre las imágenes más fácilmente
- Se añade selector de fecha en vista de citas y vista de ejercicios
- Se mejora la visualización de citas
- Se añade categoría en listado de pacientes (Admin) para separar pacientes activos de pacientes inactivos

### 0.6.0

- Se añaden nuevos campos de progreso. Ahora se categorizan en 'pliegues', 'perimetros' y 'resultados'. El administrador puede consultarlos y también actualizarlos. El paciente puede ver la evolución de su progreso.

### 0.7.0

- Se añade la pantalla de comentarios, en la que el paciente podrá dejar anotaciones o mensajes para el administrador con respecto a los ejercicios que se le asignaron

### 0.8.0

- Se añade la tarjeta "Próximas citas" en el perfil del Administrador
- Se añade la tarjeta "Próximas citas" y "Próximos ejercicos" en el perfil del Paciente.
- El Administrador puede eliminar ejercicios ya programados
- Los campos de progreso se vuelve por defecto de tipo numérico
- El campo `RESULTADOS SUMA PLIEGUES` se deshabilita y su valor se computa del resto de respuestas
- Se oculta el botón de subir fotografías en categorías distinta a "Actividades" en galería del paciente
- Se añade un botón de cerrar sesión más visible y más accesible
- Se reemplaza el campo de `Lugar` en la creación de una nueva cita del Administrador por un Select con los valores predeterminados

### 0.9.0

- Se corrige formato de fechas para mantener consistencia entre frontend y backend
- Se añade selector de fecha para creación de ejercicio con un usuario administrador

### 0.9.1

- Se elimina hora en el listado de "Próximos ejercicios" y en su lugar se muestra la cantidad de ejercicios por fecha
