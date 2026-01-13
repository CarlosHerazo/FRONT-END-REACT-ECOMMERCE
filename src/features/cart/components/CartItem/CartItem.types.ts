export interface CartItemProps {
  item: {
    id: string;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    imageUrl: string;
    stock: number;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}