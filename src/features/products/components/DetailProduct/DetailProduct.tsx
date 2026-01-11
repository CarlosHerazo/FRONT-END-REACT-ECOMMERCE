import React, { useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { addItem } from '../../../cart/store/cartSlice';
import Icon from '../../../../shared/ui/Icon';

import type { ProductDetailProps, StorageOption, ReviewSummary } from './ProductDetail.types';
import styles from './ProductDetail.module.css';

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onAddToCart, 
  onBuyNow,
  onQuantityChange 
}) => {
  const [selectedStorage, setSelectedStorage] = useState<string>('128GB');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('description');
  const dispatch = useAppDispatch();
  // Mock de opciones de almacenamiento
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

  const handleBuyNow = () => {
    onBuyNow?.(product.id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const calculateDiscount = () => {
    // Simular un precio original con 10% de descuento
    const originalPrice = product.price * 1.1;
    return {
      original: originalPrice,
      discount: originalPrice - product.price,
      percentage: Math.round(((originalPrice - product.price) / originalPrice) * 100)
    };
  };

  const discount = calculateDiscount();

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

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
        <a href="#" className={styles.breadcrumbLink}>Home</a>
        <span className={styles.breadcrumbSeparator}>/</span>
        <a href="#" className={styles.breadcrumbLink}>Electronics</a>
        <span className={styles.breadcrumbSeparator}>/</span>
        <a href="#" className={styles.breadcrumbLink}>Audio</a>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      <div className={styles.productGrid}>
        {/* Columna Izquierda: Galería */}
        <div className={styles.galleryColumn}>
          <div className={styles.mainImage}>
            <div 
              className={styles.imageContainer}
              style={{ backgroundImage: `url(${product.imgUrl})` }}
              role="img"
              aria-label={product.name}
            />
          </div>
          
          <div className={styles.thumbnails}>
            {/* Thumbnail principal */}
            <button className={`${styles.thumbnail} ${styles.thumbnailActive}`}>
              <div 
                className={styles.thumbnailImage}
                style={{ backgroundImage: `url(${product.imgUrl})` }}
              />
            </button>
            
            {/* Thumbnails adicionales (mock) */}
            <button className={styles.thumbnail}>
              <div className={`${styles.thumbnailImage} ${styles.thumbnailPlaceholder}`}>
                <Icon name="photo" />
              </div>
            </button>

            <button className={styles.thumbnail}>
              <div className={`${styles.thumbnailImage} ${styles.thumbnailPlaceholder}`}>
                <Icon name="photo" />
              </div>
            </button>
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
              {reviewSummary.averageRating} ({reviewSummary.totalReviews} reviews)
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
                  ? `In Stock - ${product.stock} units available` 
                  : 'Out of Stock'}
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
              <span className={styles.optionLabel}>Storage Capacity</span>
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
              <span className={styles.optionLabel}>Quantity</span>
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
              Buy Now
            </button>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <Icon name="shopping_cart" />
              Add to Cart
            </button>
          </div>

          {/* Servicios/Beneficios */}
          <div className={styles.servicesSection}>
            <div className={styles.serviceItem}>
              <Icon name="local_shipping" className={styles.serviceIcon} />
              <div>
                <p className={styles.serviceTitle}>Free Shipping</p>
                <p className={styles.serviceSubtitle}>On orders over $50</p>
              </div>
            </div>

            <div className={styles.serviceItem}>
              <Icon name="security" className={styles.serviceIcon} />
              <div>
                <p className={styles.serviceTitle}>2 Year Warranty</p>
                <p className={styles.serviceSubtitle}>Full manufacturer coverage</p>
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
            Description
          </button>
          <button 
            className={`${styles.tabHeader} ${activeTab === 'specifications' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={`${styles.tabHeader} ${activeTab === 'shipping' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping & Returns
          </button>
          <button 
            className={`${styles.tabHeader} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({reviewSummary.totalReviews})
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
                    <h4 className={styles.shippingTitle}>Shipping Information</h4>
                    <p className={styles.shippingText}>
                      • Free standard shipping on orders over $50<br/>
                      • Express shipping available for $9.99<br/>
                      • Estimated delivery: 3-5 business days<br/>
                      • International shipping available
                    </p>
                  </div>
                </div>
                <div className={styles.shippingItem}>
                  <Icon name="assignment_return" className={styles.shippingIcon} />
                  <div>
                    <h4 className={styles.shippingTitle}>Return Policy</h4>
                    <p className={styles.shippingText}>
                      • 30-day return policy from delivery date<br/>
                      • Products must be in original condition<br/>
                      • Free returns for defective items<br/>
                      • Refund processed within 5-7 business days
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
                    Based on {reviewSummary.totalReviews} reviews
                  </p>
                </div>

                <div className={styles.ratingBars}>
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className={styles.ratingBarRow}>
                      <span className={styles.starCount}>{stars} stars</span>
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