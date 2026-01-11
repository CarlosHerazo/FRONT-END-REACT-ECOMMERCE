# E-commerce Frontend - Technical Test

Aplicación frontend de e-commerce construida con React, TypeScript y Vite. Incluye funcionalidades de catálogo de productos, carrito de compras, checkout con integración de pagos Wompi, y consulta de transacciones.

## Repositorio Backend

Este proyecto se conecta con el backend desarrollado en NestJS:

**Backend Repository:** [https://github.com/CarlosHerazo/BACKEND-NEST-TEST.git](https://github.com/CarlosHerazo/BACKEND-NEST-TEST.git)

## Tecnologías Principales

- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Redux Toolkit** - Manejo de estado global
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Wompi** - Integración de pagos

## Características

### Páginas Implementadas

- **Home** - Catálogo de productos con filtrado por categorías
- **Detalle de Producto** - Información detallada y opción de agregar al carrito
- **Carrito** - Gestión de productos seleccionados y resumen de compra
- **Checkout** - Proceso de pago con formulario de datos del cliente y tarjeta de crédito
- **Transacciones** - Búsqueda y visualización de transacciones por email

### Funcionalidades

- Navegación entre productos y categorías
- Gestión de carrito (agregar, eliminar, actualizar cantidades)
- Proceso de checkout con validación de datos
- Integración con pasarela de pagos Wompi
- Consulta de historial de transacciones
- Sistema de notificaciones toast
- Diseño responsive

## Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd front-end
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# API Configuration
VITE_API_URL=https://nest-back.testbydevelopment.space/api/v1
# Para desarrollo local descomenta la siguiente línea:
# VITE_API_URL=http://localhost:3000/api/v1

# Wompi Configuration
VITE_WOMPI_PUBLIC_KEY=pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7
```

4. **Ejecutar en modo desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Previsualiza la build de producción
npm run lint     # Ejecuta el linter
```

## Estructura del Proyecto

```
src/
├── features/          # Funcionalidades por módulo
│   ├── cart/         # Carrito de compras
│   ├── checkout/     # Proceso de pago
│   ├── products/     # Catálogo de productos
│   └── transactions/ # Historial de transacciones
├── pages/            # Páginas de la aplicación
│   ├── Home/
│   ├── Cart/
│   ├── Checkout/
│   ├── ProductDetail/
│   └── Transactions/
├── shared/           # Componentes y utilidades compartidas
│   ├── ui/          # Componentes UI reutilizables
│   └── services/    # Servicios y APIs
└── store/           # Configuración de Redux
```

## Integración con Backend

La aplicación se conecta con el backend mediante las siguientes endpoints principales:

- `GET /products` - Obtener catálogo de productos
- `GET /products/:id` - Obtener detalle de producto
- `POST /transactions` - Crear transacción de pago
- `GET /transactions?email=` - Buscar transacciones por email

## Sistema de Pagos

La aplicación utiliza **Wompi** como pasarela de pagos en modo de prueba (staging). Para realizar pagos de prueba, se pueden usar tarjetas de crédito de prueba proporcionadas por Wompi.

## Notas de Desarrollo

- El proyecto usa `rolldown-vite` como bundler optimizado
- Redux Toolkit para manejo de estado centralizado
- Arquitectura modular por features
- TypeScript para type safety

## Autor

Carlos Herazo

## Licencia

Proyecto privado - Technical Test
