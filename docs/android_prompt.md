
# Prompt para Gemini 3: Creación de la Versión Nativa de Android para "Uataco"

## Objetivo Principal

Generar una aplicación nativa de Android completamente funcional en Kotlin que replique las características y la experiencia de usuario de la aplicación web de viajes "Uataco", construida con Next.js. La aplicación debe ser robusta, escalable y seguir las mejores prácticas de desarrollo de Android moderno.

## Requisitos del Stack Tecnológico

- **Lenguaje:** Kotlin (100%).
- **UI:** Jetpack Compose para una UI declarativa y moderna. No usar XML layouts.
- **Asincronía:** Coroutines y Flow de Kotlin para gestionar operaciones asíncronas y flujos de datos reactivos.
- **Arquitectura:** MVVM (Model-View-ViewModel) estricto. Separar claramente la lógica de la UI (Composables), la lógica de negocio (ViewModels) y las fuentes de datos (Repositories).
- **Inyección de Dependencias:** Hilt para gestionar las dependencias en toda la aplicación.
- **Networking:** Retrofit para realizar llamadas a las APIs de Amadeus.
- **Persistencia Local:** Room para cachear datos de configuración o de usuario si es necesario (ej. historial de búsqueda reciente).
- **Integración con Firebase:**
  - **Autenticación:** Firebase Authentication SDK para Android.
  - **Base de Datos:** Cloud Firestore SDK para Android.
- **Navegación:** Jetpack Navigation for Compose.

## Estructura del Proyecto

Organiza el código en una estructura de paquetes clara y escalable, basada en features:

```
com.uataco.travel/
├── data/
│   ├── local/             # Clases de Room (DAO, Entity, Database)
│   ├── remote/
│   │   ├── dto/           # Data Transfer Objects para Retrofit y Firebase
│   │   └── api/           # Interfaces de Retrofit (Amadeus, etc.)
│   └── repository/        # Implementaciones de repositorios
├── di/                    # Módulos de Hilt
├── domain/
│   ├── model/             # Modelos de dominio limpios (para la UI)
│   └── usecase/           # Casos de uso (opcional, para lógica de negocio compleja)
├── ui/
│   ├── theme/             # Theme.kt, Color.kt, Typography.kt
│   ├── components/        # Componentes de UI reusables (CustomButton, LoadingSpinner, etc.)
│   └── features/
│       ├── auth/          # LoginScreen, SignupScreen, AuthViewModel
│       ├── home/          # HomeScreen (con las pestañas de búsqueda)
│       ├── flights/       # FlightSearchScreen, FlightResultsScreen, FlightDetailScreen
│       ├── hotels/        # HotelSearchScreen, HotelResultsScreen, HotelDetailScreen
│       └── profile/       # ProfileScreen, BookingsScreen, etc.
└── UatacoApplication.kt   # Application class con @HiltAndroidApp
```

## Funcionalidades a Implementar (Features)

Replicar cada una de las funcionalidades de la aplicación web existente.

### 1. Autenticación de Usuario

- Implementar flujos de **Login** y **Sign-up** usando correo/contraseña y **Google Sign-In**.
- Utilizar el `AuthRepository` para abstraer las llamadas a `FirebaseAuth`.
- Gestionar el estado de autenticación del usuario en toda la aplicación. Un `AuthViewModel` puede exponer el estado del usuario (logueado o no).
- Una vez logueado, los datos del usuario (incluyendo `vipTier`) deben ser obtenidos desde el documento del usuario en Firestore en `/users/{userId}`.

### 2. Búsqueda de Vuelos, Hoteles, Paquetes, Cruceros y Actividades

- Crear una pantalla principal (`HomeScreen`) con una interfaz de pestañas (Tabs) similar a la web para cada tipo de búsqueda.
- **Formularios de Búsqueda:** Para cada pestaña, construir un formulario con Jetpack Compose.
- **Lógica de Búsqueda:**
  - Los ViewModels correspondientes (`FlightSearchViewModel`, `HotelSearchViewModel`, etc.) deben manejar la lógica.
  - El ViewModel llamará a un `SearchRepository`.
  - El `SearchRepository` utilizará Retrofit para llamar a las **serverless functions (actions) de Next.js** para `searchFlights`, `searchHotels`, etc. Esto es crucial: la app Android **no** llamará directamente a Amadeus, sino que consumirá las mismas actions que ya usa la app web.
- **Visualización de Resultados:** Crear pantallas de resultados (`FlightResultsScreen`, etc.) que muestren los datos en `LazyColumn` o `LazyVerticalGrid` de tarjetas de Compose.

### 3. Flujo de Reserva (Checkout)

- Replicar el flujo de pago paso a paso.
- Crear Composables para cada sección: información del pasajero, contacto, método de pago, servicios adicionales y resumen de precio.
- Utilizar un `CheckoutViewModel` para gestionar el estado del formulario a través de los diferentes pasos. La validación debe hacerse en el ViewModel.

### 4. Perfil de Usuario

- Crear una `ProfileScreen` que muestre la información del usuario obtenida de Firebase Auth y Firestore.
- Implementar la sección "Membresía VIP":
  - Si el usuario no tiene un `vipTier` en su documento de Firestore, mostrar el formulario para activar el código.
  - Al enviar el código, llamar a la action `activateVipMembership`.
  - Si tiene un `vipTier`, mostrar la tarjeta con los beneficios correspondientes a su nivel (Gold, Platinum, Black).
- Replicar las demás secciones: "Próximo Viaje", "Mis Reservas", "Álbumes", etc., utilizando datos mock por ahora.

### 5. Interacción con Firestore

- **Reglas de Seguridad:** Las reglas de seguridad de la base de datos ya están definidas en `firestore.rules`. La lógica de la aplicación Android debe respetarlas.
- **Modelos de Datos:** Crear clases de datos (DTOs) en Kotlin que coincidan con la estructura de los documentos en Firestore (ej. `UserProfile`, `VipMembership`).
- **Acceso a Datos:** Utilizar el SDK de Firestore para Android para todas las interacciones. Por ejemplo, al leer los datos de un usuario: `db.collection("users").document(userId).get()`.

### 6. Consideraciones de UI/UX

- **Diseño:** Utilizar Material Design 3. Los colores, tipografía y espaciado deben estar definidos en el `theme` de Compose para ser consistentes.
- **Componentes:** Crear componentes de UI genéricos y reusables (ej. `StyledButton`, `SearchInputField`, `LoadingIndicator`).
- **Estado de Carga y Error:** Cada pantalla debe manejar y mostrar adecuadamente los estados de carga (ej. mostrando un `CircularProgressIndicator`) y los estados de error (ej. mostrando un `Snackbar` o un mensaje en pantalla).

## Prompt de Inicio

"Comienza creando la estructura base del proyecto Android en Kotlin con Jetpack Compose y Hilt. Define la clase `UatacoApplication`, el paquete `di` con un `AppModule` básico, y el paquete `ui.theme` con la configuración inicial de Material 3. A continuación, implementa el flujo de autenticación completo (Login/Signup con email y Google) utilizando Firebase Auth y un `AuthViewModel`."
