import { Breadcrumbs, StateExamples } from '../../shared/ui';
import { ProductsGrid, CategoryChips } from '../../features/products';
import styles from './HomePage.module.css';
import { useHomePage } from '../../features/home/hook/useHomePage';

const categories = [
  'Todos los artículos',
  'Electrónicos',
  'Accesorios',
  'Computación',
];

export const HomePage = () => {
  const {
    products,
    loading,
    error,
    activeCategory,
    isFiltering,
    shouldShowStateExamples,
    handleAddToCart,
    handleToggleFavorite,
    handleCategoryChange,
    handleClearFilters,
  } = useHomePage();

  const breadcrumbItems = [
    { label: 'Inicio', href: '/Home' },
    { label: 'Productos', href: '/products' },
  ];

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

      {shouldShowStateExamples ? (
        <StateExamples
          onClearFilters={handleClearFilters}
          isLoading={loading}
          isEmpty={isFiltering && products.length === 0}
          searchQuery=""
          activeCategory={activeCategory !== 'Todos los artículos' ? activeCategory : ''}
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
