export interface CartItemProps {
  item: {
    id: string;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}