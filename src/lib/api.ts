import { products } from "../data/products";
import { categories } from "../data/categories";
import type { Product, Category, Order, ShippingAddress, CartItem } from "../data/types";

function delay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateOrderId(): string {
  const prefix = "CMX";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// ── Products ──────────────────────────────────────────────────

export async function getProducts(options?: {
  category?: string;
  search?: string;
  sort?: "price-asc" | "price-desc" | "newest" | "popular";
}): Promise<Product[]> {
  await delay(300 + Math.random() * 300);

  let result = [...products];

  if (options?.category) {
    result = result.filter((p) => p.category === options.category);
  }

  if (options?.search) {
    const query = options.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  if (options?.sort) {
    switch (options.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
  }

  return result;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  await delay(200 + Math.random() * 200);
  return products.find((p) => p.id === id);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  await delay(200 + Math.random() * 200);
  return products.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(count = 6): Promise<Product[]> {
  await delay(300 + Math.random() * 200);
  return [...products]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, count);
}

// ── Categories ────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  await delay(200);
  return [...categories];
}

export async function getCategory(
  slug: string
): Promise<Category | undefined> {
  await delay(200);
  return categories.find((c) => c.slug === slug);
}

// ── Orders ────────────────────────────────────────────────────

export async function placeOrder(params: {
  items: CartItem[];
  shippingAddress: ShippingAddress;
}): Promise<Order> {
  await delay(800 + Math.random() * 400);

  const subtotal = params.items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 100 ? 0 : 12;

  const order: Order = {
    id: generateOrderId(),
    items: params.items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    status: "pending",
    shippingAddress: params.shippingAddress,
    createdAt: new Date().toISOString(),
  };

  // In a real app, this would persist to a database.
  // For the demo, consumers can store the result in localStorage.
  return order;
}

export async function getOrder(
  orderId: string
): Promise<Order | undefined> {
  await delay(300);
  // Orders are only available via localStorage in the demo
  const stored = localStorage.getItem("commercex-orders");
  if (!stored) return undefined;
  const orders: Order[] = JSON.parse(stored);
  return orders.find((o) => o.id === orderId);
}

export async function getOrders(): Promise<Order[]> {
  await delay(300);
  const stored = localStorage.getItem("commercex-orders");
  if (!stored) return [];
  return JSON.parse(stored) as Order[];
}
