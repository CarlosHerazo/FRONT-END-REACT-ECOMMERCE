import { Breadcrumbs, StateExamples } from '../../shared/ui';
import { ProductsGrid, CategoryChips, useProducts } from '../../features/products';
import { useState, useEffect } from 'react';
import { useToast } from '../../shared/ui/Toast';
import { useAppDispatch } from '../../store/hooks';
import { addItem } from '../../features/cart/store/cartSlice';
import styles from './HomePage.module.css';

const categories = [
  'Todos los artículos',
  'Electrónicos',
  'Accesorios',
  'Computación',
];

export const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos los artículos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const { products, loading, error, filterByCategory, resetFilters } = useProducts();
  const { showSuccess } = useToast();
  const dispatch = useAppDispatch();

  // Efecto para detectar si está filtrando (categoría diferente a "Todos los artículos")
  useEffect(() => {
    setIsFiltering(activeCategory !== 'Todos los artículos');
  }, [activeCategory]);

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      dispatch(addItem({
        id: product.id,
        name: product.name,
        sku: `SKU-${product.id}`,
        price: product.price,
        imageUrl: product.imgUrl,
        description: product.description,
      }));
      showSuccess(`¡${product.name} agregado al carrito!`);
    }
  };

  const handleToggleFavorite = (productId: string) => {
    console.log('Toggled favorite:', productId);
    // TODO: lógica de favoritos
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setIsFiltering(true);

    if (category === 'Todos los artículos') {
      resetFilters();
      setIsFiltering(false);
    } else {
      filterByCategory(category);
    }
  };

  const handleClearFilters = () => {
    setActiveCategory('Todos los artículos');
    setSearchQuery('');
    resetFilters();
    setIsFiltering(false);
  };

  const breadcrumbItems = [
    { label: 'Inicio', href: '/Home' },
    { label: 'Productos', href: '/products' },
  ];

  // Determinar si mostrar StateExamples
  const shouldShowStateExamples = loading || (isFiltering && products.length === 0);

  return (
    <main className={`container ${styles.homePage}`}>
      <Breadcrumbs items={breadcrumbItems} />

      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            {isFiltering && activeCategory !== 'Todos los artículos'
              ? `Productos de ${activeCategory}`
              : 'Productos disponibles'}
          </h1>
          <p className={styles.subtitle}>
            {loading
              ? 'Cargando productos...'
              : isFiltering && products.length === 0
              ? 'No se encontraron productos'
              : `Disponibles: ${products.length}`}
          </p>
        </div>
      </div>

      <div className={styles.categoriesWrapper}>
        <CategoryChips
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <p className={styles.errorText}>
            Error al cargar productos: {error.message}
          </p>
        </div>
      )}

      {/* Mostrar StateExamples solo cuando sea necesario */}
      {shouldShowStateExamples ? (
        <StateExamples
          onClearFilters={handleClearFilters}
          isLoading={loading}
          isEmpty={isFiltering && products.length === 0}
          searchQuery={searchQuery}
          activeCategory={activeCategory !== 'All Items' ? activeCategory : ''}
        />
      ) : products.length > 0 ? (
        <div className={styles.productsSection}>
          <ProductsGrid
            products={products}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      ) : (
        <StateExamples
          onClearFilters={handleClearFilters}
          isEmpty={true}
          activeCategory=""
          searchQuery=""
        />
      )}
    </main>
  );
};