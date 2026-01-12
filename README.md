# E-commerce Frontend - Technical Test

Aplicación frontend de e-commerce construida con React, TypeScript y Vite. Incluye funcionalidades lista de productos, carrito de compras, checkout con integración de pagos Wompi, y consulta de transacciones.

**Aplicación en producción:** [https://front-end-react-ecommerce.vercel.app/](https://front-end-react-ecommerce.vercel.app/)

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

#### Navegación y UI
- Navegación entre productos y categorías con chips de filtrado
- Sistema de breadcrumbs para navegación contextual
- Header responsive con logo optimizado en WebP
- Sidebar lateral para navegación rápida
- Footer informativo
- Diseño responsive con CSS modules
- Sistema de iconos personalizados

#### Gestión de Productos
- Catálogo de productos con grid responsive
- ProductCard con información de producto y precio
- Detalle de producto con descripción completa
- Filtrado por categorías
- Imágenes de productos con fallback

#### Carrito de Compras
- Agregar, eliminar y actualizar cantidades de productos
- Persistencia del carrito en Redux
- Resumen de orden con totales y subtotales
- Indicadores de métodos de pago aceptados
- Señales de confianza (envío gratis, garantía, soporte)
- Items del carrito con controles de cantidad

#### Proceso de Checkout
- Formulario de datos del cliente con validación
- Formulario de tarjeta de crédito con validación en tiempo real
- Preview visual de tarjeta de crédito (react-credit-cards-2)
- Resumen de orden en el checkout
- Integración con pasarela de pagos Wompi
- Validación de clave pública de Wompi

#### Transacciones
- Búsqueda de transacciones por email
- Modal de entrada de email
- Visualización de tarjetas de transacción
- Historial completo de pagos

#### Sistema de Notificaciones
- Toast notifications contextuales
- ToastContainer con gestión de múltiples notificaciones
- Toast context para manejo global

#### Optimizaciones
- Imágenes en formato WebP para mejor rendimiento
- Componentes modulares y reutilizables
- TypeScript para type safety
- Lazy loading de componentes
- Optimización de assets

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
├── features/                # Funcionalidades por módulo
│   ├── cart/               # Carrito de compras
│   │   ├── components/
│   │   │   ├── CartItem/          # Item individual del carrito
│   │   │   ├── OrderSummary/      # Resumen de la orden
│   │   │   ├── PaymentMethods/    # Métodos de pago
│   │   │   └── TrustSignals/      # Señales de confianza
│   ├── checkout/           # Proceso de pago
│   │   ├── components/
│   │   │   ├── CreditCardForm/    # Formulario de tarjeta
│   │   │   ├── CustomerDataForm/  # Datos del cliente
│   │   │   └── OrderSummary/      # Resumen en checkout
│   ├── products/           # Catálogo de productos
│   │   ├── components/
│   │   │   ├── CategoryChips/     # Filtros de categoría
│   │   │   ├── DetailProduct/     # Detalle del producto
│   │   │   ├── ProductCard/       # Tarjeta de producto
│   │   │   └── ProductsGrid/      # Grid de productos
│   └── transactions/       # Historial de transacciones
│       └── components/
│           └── TransactionCard/   # Tarjeta de transacción
├── pages/                  # Páginas de la aplicación
│   ├── Home/              # Página principal
│   ├── Cart/              # Página del carrito
│   ├── Checkout/          # Página de checkout
│   ├── ProductDetail/     # Detalle de producto
│   └── Transactions/      # Historial de transacciones
├── shared/                 # Componentes y utilidades compartidas
│   ├── ui/                # Componentes UI reutilizables
│   │   ├── Breadcrumbs/   # Navegación breadcrumbs
│   │   ├── EmailModal/    # Modal de email
│   │   ├── Footer/        # Footer del sitio
│   │   ├── Header/        # Header del sitio
│   │   ├── Icon/          # Sistema de iconos
│   │   ├── Layout/        # Layout principal
│   │   ├── Sidebar/       # Sidebar de navegación
│   │   ├── StateExamples/ # Ejemplos de estados
│   │   └── Toast/         # Sistema de notificaciones
│   └── services/          # Servicios y APIs
│       ├── api.ts         # Cliente Axios
│       ├── products.ts    # Servicio de productos
│       ├── transactions.ts # Servicio de transacciones
│       └── wompi.ts       # Integración Wompi
└── store/                  # Configuración de Redux
    └── cartSlice.ts       # Slice del carrito
```

## Integración con Backend

La aplicación se conecta con el backend mediante las siguientes endpoints principales:

- `GET /products` - Obtener catálogo de productos
- `GET /products/:id` - Obtener detalle de producto
- `POST /transactions` - Crear transacción de pago
- `GET /transactions?email=` - Buscar transacciones por email

## Sistema de Pagos

La aplicación utiliza **Wompi** como pasarela de pagos en modo de prueba (staging). Para realizar pagos de prueba, se pueden usar tarjetas de crédito de prueba proporcionadas por Wompi.

## Componentes Principales

### Componentes UI Compartidos

- **Layout** - Estructura principal con Header, Sidebar y Footer
- **Header** - Navegación superior con logo y enlaces
- **Sidebar** - Menú lateral de navegación
- **Footer** - Pie de página con información
- **Breadcrumbs** - Migas de pan para navegación contextual
- **Toast** - Sistema de notificaciones con contexto global
- **Icon** - Sistema de iconos SVG personalizados
- **EmailModal** - Modal para captura de email

### Componentes de Features

#### Products
- **ProductCard** - Tarjeta de producto con imagen, título y precio
- **ProductsGrid** - Grid responsive de productos
- **DetailProduct** - Vista detallada de producto
- **CategoryChips** - Chips de filtrado por categoría

#### Cart
- **CartItem** - Item individual con controles de cantidad
- **CartSummary** - Resumen con totales y botón de checkout
- **PaymentMethods** - Indicadores de métodos de pago
- **TrustSignals** - Señales de confianza (envío, garantía)

#### Checkout
- **CustomerDataForm** - Formulario de datos personales
- **CreditCardForm** - Formulario de tarjeta con preview visual
- **OrderSummary** - Resumen de la orden en checkout

#### Transactions
- **TransactionCard** - Tarjeta de transacción individual

## Servicios

### API Services

- **api.ts** - Cliente Axios configurado con base URL y manejo de errores
- **products.ts** - Servicios para obtener productos y detalles
- **transactions.ts** - Servicios para crear y consultar transacciones
- **wompi.ts** - Integración con Wompi para procesamiento de pagos

### Redux Store

- **cartSlice.ts** - Estado global del carrito con acciones para:
  - Agregar productos
  - Eliminar productos
  - Actualizar cantidades
  - Limpiar carrito
  - Calcular totales

## Notas de Desarrollo

- El proyecto usa `rolldown-vite` como bundler optimizado
- Redux Toolkit para manejo de estado centralizado
- Arquitectura modular por features
- TypeScript para type safety
- CSS Modules para estilos aislados
- Componentes funcionales con hooks
- Validación de formularios en tiempo real
- Manejo de errores con try-catch y toast notifications
- Responsive design mobile-first

## Autor

Carlos Herazo

## Licencia

Proyecto privado - Technical Test
