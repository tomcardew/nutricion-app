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
- Se añade selector de fecha en vista de citas
- Se mejora la visualización de citas
- Se añade categoría en listado de pacientes (Admin) para separar pacientes activos de pacientes inactivos
