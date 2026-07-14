export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  images: string[];
  variants?: ProductVariant[];
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  createdAt: string;
}

export interface ProductVariant {
  type: "color" | "size";
  label: string;
  value: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  variant?: ProductVariant;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
