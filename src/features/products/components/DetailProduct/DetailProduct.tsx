import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { addItem } from '../../../cart/store/cartSlice';
import Icon from '../../../../shared/ui/Icon';

import type { ProductDetailProps, StorageOption, ReviewSummary } from './ProductDetail.types';
import styles from './ProductDetail.module.css';
import { formatPrice } from '../../../../utils/utils';

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onQuantityChange
}) => {
  const [selectedStorage, setSelectedStorage] = useState<string>('128GB');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('description');
  const [selectedImage, setSelectedImage] = useState<string>(product.imgUrl);
  const dispatch = useAppDispatch();

  const allImages = React.useMemo(() => {
    // Filtrar imágenes válidas (no vacías ni undefined)
    const additionalImages = product.images?.filter(img => img && img.trim() !== '') || [];

    // Si hay imágenes adicionales, combinar con la principal
    if (additionalImages.length > 0) {
      return [product.imgUrl, ...additionalImages];
    }

    // Si no hay imágenes adicionales, solo la principal
    return [product.imgUrl];
  }, [product.imgUrl, product.images]);


  // Actualizar imagen seleccionada cuando cambie el producto
  useEffect(() => {
    setSelectedImage(product.imgUrl);
  }, [product.imgUrl]);
  
  // Mock de opciones
  const storageOptions: StorageOption[] = [
    { capacity: 'option 1', price: 0 },
    { capacity: 'option 2', price: 100 },
    { capacity: 'option 3', price: 300 },
    { capacity: 'option 4', price: 500 }
  ];
  
  // Mock de reseñas
  const reviewSummary: ReviewSummary = {
    averageRating: 4.8,
    totalReviews: 1240,
    ratings: {
      5: 80,
      4: 12,
      3: 5,
      2: 1,
      1: 2
    }
  };
  // agregar al carrito
  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      sku: "SM-"+product.id,
      price: product.price,
      imageUrl: product.imgUrl,
      description: product.description
    }));
    onAddToCart?.(product.id);
  };
  // comprar ahora
  const handleBuyNow = () => {
    onBuyNow?.(product.id);
  };
  // cambiar cantidad
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };
  // calcular descuento
  const calculateDiscount = () => {
    const originalPrice = product.price * 1.1;
    return {
      original: originalPrice,
      discount: originalPrice - product.price,
      percentage: Math.round(((originalPrice - product.price) / originalPrice) * 100)
    };
  };
  const discount = calculateDiscount();


  // Renderizar estrellas de rating
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={`full-${i}`} name="star" className={styles.starFilled} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star_half" className={styles.starHalf} />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star" className={styles.starEmpty} />
      );
    }

    return stars;
  };

  return (
    <div className={styles.productDetail}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <a href="#" className={styles.breadcrumbLink}>Inicio</a>
        <span className={styles.breadcrumbSeparator}>/Productos</span>
        <span className={styles.breadcrumbSeparator}>/Detalle</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      <div className={styles.productGrid}>
        {/* Columna Izquierda: Galería */}
        <div className={styles.galleryColumn}>
          <div className={styles.mainImage}>
            <div
              className={styles.imageContainer}
              style={{ backgroundImage: `url(${selectedImage})` }}
              role="img"
              aria-label={product.name}
            />
          </div>

          <div className={styles.thumbnails}>
            {allImages.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${selectedImage === image ? styles.thumbnailActive : ''}`}
                onClick={() => setSelectedImage(image)}
              >
                <div
                  className={styles.thumbnailImage}
                  style={{ backgroundImage: `url(${image})` }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Información del Producto */}
        <div className={styles.infoColumn}>
          <div className={styles.brandSection}>
            <span className={styles.brandLabel}>Premium</span>
          </div>

          <h1 className={styles.productTitle}>{product.name}</h1>

          {/* Rating */}
          <div className={styles.ratingSection}>
            <div className={styles.stars}>
              {renderRatingStars(reviewSummary.averageRating)}
            </div>
            <span className={styles.ratingText}>
              {reviewSummary.averageRating} ({reviewSummary.totalReviews} reseñas)
            </span>
          </div>

          {/* Precio y Disponibilidad */}
          <div className={styles.priceSection}>
            <div className={styles.priceRow}>
              <p className={styles.currentPrice}>{formatPrice(product.price)}</p>
              <p className={styles.originalPrice}>{formatPrice(discount.original)}</p>
              <span className={styles.discountBadge}>SAVE {discount.percentage}%</span>
            </div>
            
            <div className={styles.availability}>
              <span className={`${styles.statusDot} ${product.stock > 0 ? styles.inStock : styles.outOfStock}`}></span>
              <span className={styles.statusText}>
                {product.stock > 0
                  ? `En Stock - ${product.stock} unidades disponibles`
                  : 'Agotado'}
              </span>
            </div>
          </div>

          {/* Descripción */}
          <div className={styles.descriptionSection}>
            <p className={styles.productDescription}>{product.description}</p>
          </div>

          {/* Opciones */}
          <div className={styles.optionsSection}>
            {/* Capacidad de almacenamiento */}
            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Capacidad de Almacenamiento</span>
              <div className={styles.storageOptions}>
                {storageOptions.map((option) => (
                  <button
                    key={option.capacity}
                    className={`${styles.storageOption} ${
                      selectedStorage === option.capacity ? styles.storageOptionActive : ''
                    }`}
                    onClick={() => setSelectedStorage(option.capacity)}
                  >
                    <span className={styles.capacity}>{option.capacity}</span>
                    {option.price > 0 && (
                      <span className={styles.optionPrice}>+{formatPrice(option.price)}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Cantidad</span>
              <div className={styles.quantitySelector}>
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Icon name="remove" />
                </button>
                <div className={styles.quantityValue}>{quantity}</div>
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Icon name="add" />
                </button>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className={styles.actionButtons}>
            <button
              className={styles.buyNowButton}
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              <Icon name="shopping_bag" />
              Comprar Ahora
            </button>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <Icon name="shopping_cart" />
              Agregar al Carrito
            </button>
          </div>

          {/* Servicios/Beneficios */}
          <div className={styles.servicesSection}>
            <div className={styles.serviceItem}>
              <Icon name="local_shipping" className={styles.serviceIcon} />
              <div>
                <p className={styles.serviceTitle}>Envío Gratis</p>
                <p className={styles.serviceSubtitle}>En pedidos mayores a $50</p>
              </div>
            </div>

            <div className={styles.serviceItem}>
              <Icon name="security" className={styles.serviceIcon} />
              <div>
                <p className={styles.serviceTitle}>Garantía de 2 Años</p>
                <p className={styles.serviceSubtitle}>Cobertura completa del fabricante</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de información detallada */}
      <div className={styles.detailsTabs}>
        <div className={styles.tabHeaders}>
          <button
            className={`${styles.tabHeader} ${activeTab === 'description' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Descripción
          </button>
          <button
            className={`${styles.tabHeader} ${activeTab === 'specifications' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            Especificaciones
          </button>
          <button
            className={`${styles.tabHeader} ${activeTab === 'shipping' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            Envío y Devoluciones
          </button>
          <button
            className={`${styles.tabHeader} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reseñas ({reviewSummary.totalReviews})
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'description' && (
            <div className={styles.tabPane}>
              <div className={styles.descriptionContent}>
                <h3 className={styles.tabTitle}>Premium Quality & Performance</h3>
                <p className={styles.tabText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Praesent euismod, justo a vulputate facilisis, nisl urna 
                  viverra orci, a tincidunt metus odio at sapien. Suspendisse 
                  potenti, nulla nec volutpat varius, sapien leo cursus urna.
                </p>
                <p className={styles.tabText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Praesent euismod, justo a vulputate facilisis, nisl urna 
                    viverra orci, a tincidunt metus odio at sapien. Suspendisse 
                    potenti, nulla nec volutpat varius, sapien leo cursus urna.
                </p>
              </div>
              
              <div className={styles.specsGrid}>
                <h3 className={styles.tabTitle}>Lorem Title</h3>
                <div className={styles.featuresList}>
                  <div className={styles.feature}>
                    <Icon name="volume_up" className={styles.featureIcon} />
                    <div>
                      <p className={styles.featureTitle}>Lorem Title</p>
                      <p className={styles.featureDesc}>Lorem ipsum dolor sit amet, elit. </p>
                    </div>
                  </div>
                  <div className={styles.feature}>
                    <Icon name="battery_full" className={styles.featureIcon} />
                    <div>
                      <p className={styles.featureTitle}>Lorem Title</p>
                      <p className={styles.featureDesc}>Lorem ipsum dolor sit amet, elit. </p>
                    </div>
                  </div>
                  <div className={styles.feature}>
                    <Icon name="bluetooth" className={styles.featureIcon} />
                    <div>
                      <p className={styles.featureTitle}>Lorem Title</p>
                      <p className={styles.featureDesc}>Lorem ipsum dolor sit amet, elit. </p>
                    </div>
                  </div>
                  <div className={styles.feature}>
                    <Icon name="water_drop" className={styles.featureIcon} />
                    <div>
                      <p className={styles.featureTitle}>Lorem Title</p>
                      <p className={styles.featureDesc}>Lorem ipsum dolor sit amet, elit. </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className={styles.tabPane}>
              <div className={styles.specsGrid}>
                <h3 className={styles.tabTitle}>Lorem technical specifications</h3>
                <div className={styles.specsList}>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Product Name</span>
                    <span className={styles.specValue}>{product.name}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Color</span>
                    <span className={styles.specValue}>Lorem ipsum</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Connectivity</span>
                    <span className={styles.specValue}>Lorem ipsum</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Battery Life</span>
                    <span className={styles.specValue}>Lorem ipsum</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Charging Time</span>
                    <span className={styles.specValue}>Lorem ipsum</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Weight</span>
                    <span className={styles.specValue}>Lorem ipsum</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Warranty</span>
                    <span className={styles.specValue}>Lorem ipsum</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className={styles.tabPane}>
              <h3 className={styles.tabTitle}>Shipping & Returns Policy</h3>
              <div className={styles.shippingInfo}>
                <div className={styles.shippingItem}>
                  <Icon name="local_shipping" className={styles.shippingIcon} />
                  <div>
                    <h4 className={styles.shippingTitle}>Información de Envío</h4>
                    <p className={styles.shippingText}>
                      • Envío estándar gratis en pedidos mayores a $50<br/>
                      • Envío express disponible por $9.99<br/>
                      • Entrega estimada: 3-5 días hábiles<br/>
                      • Envío internacional disponible
                    </p>
                  </div>
                </div>
                <div className={styles.shippingItem}>
                  <Icon name="assignment_return" className={styles.shippingIcon} />
                  <div>
                    <h4 className={styles.shippingTitle}>Política de Devoluciones</h4>
                    <p className={styles.shippingText}>
                      • Política de devolución de 30 días desde la fecha de entrega<br/>
                      • Los productos deben estar en condición original<br/>
                      • Devoluciones gratis para artículos defectuosos<br/>
                      • Reembolso procesado en 5-7 días hábiles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className={styles.tabPane}>
              <div className={styles.reviewsSummary}>
                <div className={styles.ratingOverview}>
                  <p className={styles.overallRating}>{reviewSummary.averageRating}</p>
                  <div className={styles.overallStars}>
                    {renderRatingStars(reviewSummary.averageRating)}
                  </div>
                  <p className={styles.totalReviews}>
                    Basado en {reviewSummary.totalReviews} reseñas
                  </p>
                </div>

                <div className={styles.ratingBars}>
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className={styles.ratingBarRow}>
                      <span className={styles.starCount}>{stars} estrellas</span>
                      <div className={styles.ratingBar}>
                        <div 
                          className={styles.ratingFill}
                          style={{ width: `${reviewSummary.ratings[stars] || 0}%` }}
                        ></div>
                      </div>
                      <span className={styles.ratingPercentage}>
                        {reviewSummary.ratings[stars] || 0}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;