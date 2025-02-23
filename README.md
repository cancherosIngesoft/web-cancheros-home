# Reserva de Canchas App

## Descripción

Aplicación web para la gestión y reserva de canchas deportivas.

## Estructura del Proyecto

### Componentes (/components)

- **forms/**: Formularios y componentes relacionados
  - fields-register/: Componentes para registro de canchas
    - addFieldModal.tsx: Modal para agregar/editar canchas
    - scheduleSelector.tsx: Selector de horarios
    - scheduleCalendar.tsx: Calendario de horarios
- **reservar_components/**: Componentes para reservas
  - BookingForm.tsx: Formulario de reserva
  - ReprogramationModal.tsx: Modal para reprogramar reservas
- **ui/**: Componentes base reutilizables
  - button.tsx
  - input.tsx
  - select.tsx
  - dialog.tsx
  - etc.

### Estado Global (/store)

- **index.ts**: Configuración principal del store
- **types.ts**: Tipos e interfaces del store
- Slices:
  - auth: Autenticación
  - field: Gestión de canchas
  - user: Datos de usuario
  - hostReservation: Reservas del host

### Acciones (/actions)

- **registro_host/**: Acciones relacionadas con el registro de canchas
  - field.ts: Operaciones CRUD de canchas
- **book_field/**: Acciones para reservas
- **reservation/**: Gestión de reservaciones

### Utilidades (/utils)

- utils.ts: Funciones auxiliares (fetchWithRetry, formateo, etc.)

## Tecnologías Principales

- Next.js 13+
- TypeScript
- Zustand (Estado global)
- React Hook Form
- Shadcn/ui
- TanStack Query

## Instalación y Desarrollo

- npm install
  -npm run dev

## Convenciones de Código

- Nombres de componentes en PascalCase
- Nombres de funciones y variables en camelCase
- Interfaces prefijadas con 'I' (ej: IField)
- Tipos en PascalCase

## En Desarrollo

- Sistema de pagos
- Gestión de equipos
- Mejoras en el sistema de horarios
