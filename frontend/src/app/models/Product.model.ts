export interface Product {
  id: string;
  name: string;
  cost: number;
  url: string;
  quantity: number;
  description: string;
  features: string[];
  loading: boolean;
  quantityInCart: number;
}
