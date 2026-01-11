import { Breadcrumbs, StateExamples } from '../../shared/ui';
import { ProductsGrid, CategoryChips, useProducts } from '../../features/products';
import { useState, useEffect } from 'react';
import { useToast } from '../../shared/ui/Toast';
import { useAppDispatch } from '../../store/hooks';
import { addItem } from '../../features/cart/store/cartSlice';

const categories = [
  'All Items',
  'Electronics',
  'Apparel',
  'Home & Living',
  'Accessories',
  'Computing',
  'Clothing',
  'New Arrivals',
];

export const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All Items');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const { products, loading, error, filterByCategory, resetFilters } = useProducts();
  const { showSuccess } = useToast();
  const dispatch = useAppDispatch();

  // Efecto para detectar si está filtrando (categoría diferente a "All Items")
  useEffect(() => {
    setIsFiltering(activeCategory !== 'All Items');
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
      showSuccess(`${product.name} added to cart!`);
    }
  };

  const handleToggleFavorite = (productId: string) => {
    console.log('Toggled favorite:', productId);
    // TODO: Implementar lógica de favoritos
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setIsFiltering(true);
    
    if (category === 'All Items') {
      resetFilters();
      setIsFiltering(false);
    } else {
      filterByCategory(category);
    }
  };

  const handleClearFilters = () => {
    setActiveCategory('All Items');
    setSearchQuery('');
    resetFilters();
    setIsFiltering(false);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Products' },
  ];

  // Determinar si mostrar StateExamples
  const shouldShowStateExamples = loading || (isFiltering && products.length === 0);

  return (
    <main className="container">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">
            {isFiltering && activeCategory !== 'All Items' 
              ? `${activeCategory} Products`
              : 'Products available'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base mt-1">
            {loading 
              ? 'Loading products...'
              : isFiltering && products.length === 0
              ? 'No products found'
              : `Discover our curated selection of ${products.length} items`}
          </p>
        </div>
      </div>

      <CategoryChips
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-200 text-sm">
            Error loading products: {error.message}
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
        <>
          <ProductsGrid
            products={products}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
          
          {/* Puedes mostrar StateExamples normal aquí si quieres mantener la sección de demostración */}
          {/* <StateExamples onClearFilters={handleClearFilters} /> */}
        </>
      ) : (
        // Esto es por si no hay productos en absoluto (ni filtrados)
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