import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useCartStore } from "../store/cart";
import { getProduct } from "../lib/api";
import { formatPrice } from "../lib/format";
import EmptyState from "../components/EmptyState";
import type { Product } from "../data/types";

interface CartItemWithProduct {
  item: ReturnType<typeof useCartStore.getState>["items"][number];
  product: Product;
}

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (items.length === 0) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    Promise.all(
      items.map(async (item) => {
        const product = await getProduct(item.productId);
        return { item, product: product! };
      })
    ).then((result) => {
      setCartItems(result.filter((r) => r.product));
      setLoading(false);
    });
  }, [items]);

  const subtotal = cartItems.reduce(
    (sum, { item, product }) => sum + product.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 12;
  const total = subtotal + shipping;

  if (!loading && cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Start browsing our collection to find something you love."
          action={{
            label: "Continue Shopping",
            href: "/products",
          }}
          icon={
            <svg
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          }
        />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h1 className="text-3xl font-light tracking-tight text-charcoal">
          Shopping Cart
        </h1>

        <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Cart items */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 animate-pulse">
                    <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-cream-dark" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/2 rounded bg-cream-dark" />
                      <div className="h-3 w-1/4 rounded bg-cream-dark" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-border">
                {cartItems.map(({ item, product }) => (
                  <div key={item.productId} className="flex gap-4 py-6 first:pt-0">
                    <Link
                      to={`/products/${product.id}`}
                      className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-cream-dark"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            to={`/products/${product.id}`}
                            className="text-sm font-medium text-charcoal hover:text-terracotta transition-colors"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-0.5 text-xs text-warm-gray-light capitalize">
                            {product.category.replace("-", " ")}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-charcoal">
                          {formatPrice(product.price * item.quantity)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="flex h-8 w-8 items-center justify-center text-warm-gray transition-colors hover:text-charcoal"
                          >
                            &minus;
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center text-warm-gray transition-colors hover:text-charcoal"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-xs text-warm-gray-light transition-colors hover:text-terracotta"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="mt-8 lg:col-span-4 lg:mt-0">
            <div className="sticky top-24 rounded-2xl border border-border bg-white p-6">
              <h2 className="text-lg font-medium text-charcoal">
                Order Summary
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">
                    Subtotal ({cartItems.reduce((s, c) => s + c.item.quantity, 0)} items)
                  </span>
                  <span className="font-medium text-charcoal">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Shipping</span>
                  <span className="font-medium text-charcoal">
                    {shipping === 0 ? (
                      <span className="text-sage">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-warm-gray-light">
                    Free shipping on orders over $100
                  </p>
                )}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-charcoal">
                      Total
                    </span>
                    <span className="text-base font-semibold text-charcoal">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-6 block w-full rounded-xl bg-charcoal py-3.5 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-charcoal-light hover:shadow-lg"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/products"
                className="mt-3 block text-center text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
