# Arquitectura del Proyecto - Frontend E-commerce

## Descripción General

Este proyecto implementa una **arquitectura limpia y escalable basada en features/módulos**, siguiendo principios de separación de responsabilidades y reutilización de código.

## Estructura de Carpetas

```
src/
├── features/              # Módulos de características (feature-based)
│   └── products/         # Módulo de productos
│       ├── components/   # Componentes específicos de productos
│       │   ├── ProductCard/
│       │   ├── ProductsGrid/
│       │   └── CategoryChips/
│       ├── hooks/        # Custom hooks para productos
│       │   ├── useProducts.ts    # Hook para lista de productos
│       │   ├── useProduct.ts     # Hook para producto individual
│       │   └── index.ts
│       ├── services/     # Servicios de API para productos
│       │   ├── products.service.ts
│       │   └── index.ts
│       ├── types/        # TypeScript types/interfaces
│       │   ├── product.types.ts
│       │   └── index.ts
│       ├── utils/        # Utilidades específicas (futuro)
│       └── index.ts      # Barrel export del módulo
│
├── shared/               # Código compartido entre features
│   ├── api/             # Cliente HTTP y configuración
│   │   ├── httpClient.ts
│   │   └── index.ts
│   ├── ui/              # Componentes UI compartidos
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Layout/
│   │   ├── Breadcrumbs/
│   │   ├── StateExamples/
│   │   └── index.ts
│   ├── hooks/           # Hooks compartidos (futuro)
│   ├── types/           # Types compartidos
│   │   └── common.ts
│   ├── utils/           # Utilidades compartidas
│   │   └── formatters.ts
│   └── constants/       # Constantes globales (futuro)
│
├── config/              # Configuración de la aplicación
│   └── env.ts          # Variables de entorno
│
├── styles/             # Estilos globales
│   └── globals.css
│
├── App.tsx             # Componente raíz
└── main.tsx           # Punto de entrada
```

## Principios de Arquitectura

### 1. Feature-Based Architecture

Cada feature (productos, carrito, checkout, etc.) es un módulo independiente con su propia estructura:

- **components/**: Componentes UI específicos del feature
- **hooks/**: Lógica de estado y efectos
- **services/**: Llamadas a la API
- **types/**: Definiciones de TypeScript
- **utils/**: Funciones auxiliares

### 2. Barrel Exports

Cada módulo expone su API pública mediante un archivo `index.ts`:

```typescript
// features/products/index.ts
export * from './components';
export * from './hooks';
export * from './services';
export * from './types';
```

Esto permite importaciones limpias:

```typescript
import { ProductsGrid, useProducts, Product } from './features/products';
```

### 3. Separación de Responsabilidades

- **Components**: Solo renderizado y UI
- **Hooks**: Lógica de estado y efectos secundarios
- **Services**: Comunicación con la API
- **Types**: Contratos de datos

### 4. Shared vs Feature Code

**Shared (`src/shared/`)**:
- Código reutilizable entre múltiples features
- Componentes UI genéricos (Header, Footer, Layout)
- Cliente HTTP
- Utilidades comunes

**Features (`src/features/`)**:
- Código específico de una característica
- No debe ser usado directamente por otros features
- Puede usar código de `shared/`

## Integración con la API

### HTTP Client

Configuración centralizada en `src/shared/api/httpClient.ts`:

```typescript
export class HttpClient {
  // Interceptors para autenticación, logging, etc.
  // Métodos: get, post, put, patch, delete
}
```

### Services

Cada feature tiene sus propios servicios:

```typescript
// features/products/services/products.service.ts
export class ProductsService {
  async getProducts(): Promise<Product[]>
  async getProductById(id: string): Promise<Product>
  async createProduct(data: CreateProductDto): Promise<Product>
  async updateProduct(id: string, data: UpdateProductDto): Promise<Product>
}
```

### Custom Hooks

Encapsulan la lógica de fetching y estado:

```typescript
// features/products/hooks/useProducts.ts
export const useProducts = () => {
  const { products, loading, error, refetch } = ...
  return { products, loading, error, refetch }
}
```

## Flujo de Datos

1. **Component** utiliza un **Hook**
2. **Hook** llama a un **Service**
3. **Service** usa el **HTTP Client** para llamar a la API
4. Los datos fluyen de vuelta: Service → Hook → Component

```
Component (ProductsGrid)
    ↓ usa
Hook (useProducts)
    ↓ llama
Service (ProductsService)
    ↓ usa
HTTP Client
    ↓ llama
API REST
```

## Tipado Fuerte

Todos los tipos están basados en la especificación de la API:

```typescript
// features/products/types/product.types.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
```

## Escalabilidad

### Agregar un Nuevo Feature

1. Crear carpeta en `src/features/nombre-feature/`
2. Crear subcarpetas: `components/`, `hooks/`, `services/`, `types/`
3. Implementar la lógica específica
4. Crear `index.ts` para barrel exports
5. Importar y usar en `App.tsx`

Ejemplo para un feature de "cart":

```
src/features/cart/
├── components/
│   ├── CartItem/
│   ├── CartSummary/
│   └── index.ts
├── hooks/
│   ├── useCart.ts
│   └── index.ts
├── services/
│   ├── cart.service.ts
│   └── index.ts
├── types/
│   ├── cart.types.ts
│   └── index.ts
└── index.ts
```

## Variables de Entorno

Configuración en `.env`:

```env
VITE_API_URL=https://nest-back.testbydevelopment.space/api/v1
```

Acceso mediante `src/config/env.ts`:

```typescript
export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  // ...
}
```

## Mejores Prácticas

1. **Un componente por archivo**
2. **Barrel exports** en cada módulo
3. **Tipos explícitos** para todas las funciones y componentes
4. **Nombres descriptivos** que reflejen la intención
5. **Componentes pequeños** y enfocados
6. **Lógica separada** de la presentación (hooks vs components)
7. **Reutilización** mediante `shared/`
8. **Consistencia** en la estructura entre features

## Testing (Futuro)

Estructura recomendada:

```
src/features/products/
├── components/
│   └── ProductCard/
│       ├── ProductCard.tsx
│       └── ProductCard.test.tsx
├── hooks/
│   └── useProducts.test.ts
└── services/
    └── products.service.test.ts
```

## Estado Global (Futuro)

Para estado compartido entre features, se recomienda:

- Context API para estado simple
- Zustand/Redux para estado complejo
- Ubicación: `src/shared/store/`

## Conclusión

Esta arquitectura proporciona:

- ✅ **Escalabilidad**: Fácil agregar nuevos features
- ✅ **Mantenibilidad**: Código organizado y predecible
- ✅ **Reutilización**: Shared code accesible
- ✅ **Tipado fuerte**: TypeScript en toda la app
- ✅ **Separación de responsabilidades**: Cada pieza tiene un propósito claro
- ✅ **Testabilidad**: Estructura lista para tests
