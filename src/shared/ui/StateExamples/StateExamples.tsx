import React from 'react';
import Icon from '../Icon';
import styles from './StateExamples.module.css';

interface StateExamplesProps {
  onClearFilters: () => void;
  isLoading?: boolean;
  isEmpty?: boolean;
  searchQuery?: string;
  activeCategory?: string;
}

const StateExamples: React.FC<StateExamplesProps> = ({
  onClearFilters,
  isLoading = false,
  isEmpty = false,
  searchQuery = '',
  activeCategory = ''
}) => {
  // Si no está cargando y no está vacío, no mostrar nada
  if (!isLoading && !isEmpty) {
    return null;
  }

  // Si está cargando, mostrar skeletons
  if (isLoading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>
          <Icon name="analytics" />
          Cargando Productos...
        </h2>

        <div className={styles.examplesGrid}>
         { 
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.exampleSection}>
              <div className={styles.sectionTitle}>Cargando</div>
                <div className={styles.skeletonCard}>
                  <div className={`skeleton ${styles.skeletonImage}`} />
                  <div className={`skeleton ${styles.skeletonTextLarge}`} />
                  <div className={`skeleton ${styles.skeletonTextSmall}`} />
                  <div className={styles.skeletonFooter}>
                    <div className={`skeleton ${styles.skeletonPrice}`} />
                    <div className={`skeleton ${styles.skeletonButton}`} />
                  </div>
                </div>
              </div>
            ))
          
          }
          
        </div>
      </div>
    );
  }

  // Si está vacío (sin resultados de búsqueda/filtro)
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Icon name="search_off" />
        No se Encontraron Productos
      </h2>

      <div className={styles.examplesGrid}>
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>
            <Icon name="search_off" />
          </div>
          <h4 className={styles.emptyStateTitle}>
            {activeCategory && activeCategory !== 'Todos los artículos'
              ? `No hay productos en "${activeCategory}"`
              : searchQuery
              ? `No hay resultados para "${searchQuery}"`
              : 'No se encontraron productos'}
          </h4>
          <p className={styles.emptyStateText}>
            {activeCategory && activeCategory !== 'Todos los artículos'
              ? `No pudimos encontrar productos en la categoría ${activeCategory}.`
              : searchQuery
              ? 'Intenta ajustar tus términos de búsqueda o navegar por todos los productos.'
              : 'Intenta ajustar tus filtros o términos de búsqueda para encontrar lo que buscas.'}
          </p>
          <div className={styles.emptyStateActions}>
            <button
              className={styles.clearFiltersButton}
              onClick={onClearFilters}
            >
              Limpiar todos los filtros
            </button>
            {searchQuery && (
              <button
                className={styles.browseAllButton}
                onClick={() => {
                  // Esto podría ser otra función para limpiar la búsqueda
                  onClearFilters();
                }}
              >
                Ver todos los productos
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateExamples;