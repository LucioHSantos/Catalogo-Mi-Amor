export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  images?: string[]; // Multiple options/images for the client
  category: 'buques' | 'cestas';
  available: boolean;
  tag?: string; // e.g. "Mais Vendido", "Novidade", "Clássico"
  details?: string[]; // Bullet points of items inside
}

export interface CartItem {
  product: Product;
  quantity: number;
}
