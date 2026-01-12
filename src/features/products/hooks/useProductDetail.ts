import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { addItem } from '../../cart/store/cartSlice';
import { useToast } from '../../../shared/ui/Toast';
import { useProduct } from '../hooks';

export const useProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccess, showInfo } = useToast();

  const { product, loading, error } = useProduct(id || '');
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const addProductToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      dispatch(addItem({
        id: product.id,
        name: product.name,
        sku: `SKU-${product.id}`,
        price: product.price,
        imageUrl: product.imgUrl,
        description: product.description,
      }));
    }
  };

  const handleAddToCart = () => {
    addProductToCart();
    if (product) showSuccess(`¡${quantity} x ${product.name} agregado al carrito!`);
  };

  const handleBuyNow = () => {
    addProductToCart();
    if (product) showInfo('Redirigiendo al carrito...');

    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return {
    product,
    loading,
    error,
    quantity,
    handleQuantityChange,
    handleAddToCart,
    handleBuyNow,
    handleGoHome,
  };
};
