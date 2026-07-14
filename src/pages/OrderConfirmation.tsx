import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getProduct } from "../lib/api";
import { formatPrice, formatDate } from "../lib/format";
import type { Order } from "../data/types";

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const stored = localStorage.getItem("commercex-orders");
    if (stored) {
      const orders: Order[] = JSON.parse(stored);
      const found = orders.find((o) => o.id === id);
      if (found) {
        setOrder(found);
        // Fetch product names for display
        Promise.all(
          found.items.map(async (item) => {
            const product = await getProduct(item.productId);
            return { ...item, name: product?.name || item.productId };
          })
        ).then((itemsWithNames) => {
          setOrder((prev) =>
            prev ? { ...prev, _items: itemsWithNames } : prev
          );
        });
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-cream-dark" />
          <div className="h-4 w-32 rounded bg-cream-dark" />
          <div className="h-40 rounded-2xl bg-cream-dark" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-light text-charcoal">
            Order not found
          </h2>
          <Link
            to="/orders"
            className="mt-4 inline-block text-sm font-medium text-terracotta hover:text-terracotta-dark"
          >
            &larr; View all orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Success header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
            <svg
              className="h-8 w-8 text-sage"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-light tracking-tight text-charcoal">
            Order Confirmed
          </h1>
          <p className="mt-2 text-warm-gray">
            Thank you for your order! We'll send you a confirmation email soon.
          </p>
        </div>

        {/* Order details */}
        <div className="mt-10 rounded-2xl border border-border bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-warm-gray-light">
                Order ID
              </p>
              <p className="mt-1 font-mono text-sm font-medium text-charcoal">
                {order.id}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-wider text-warm-gray-light">
                Date
              </p>
              <p className="mt-1 text-sm text-charcoal">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="divide-y divide-border py-6">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    {item.productId}
                  </p>
                  <p className="text-xs text-warm-gray">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-border pt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-warm-gray">Subtotal</span>
              <span className="text-charcoal">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-warm-gray">Shipping</span>
              <span className="text-charcoal">
                {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="font-medium text-charcoal">Total</span>
              <span className="font-semibold text-charcoal">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="mt-6 rounded-xl bg-cream p-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-terracotta animate-pulse" />
              <div>
                <p className="text-sm font-medium text-charcoal capitalize">
                  Status: {order.status}
                </p>
                <p className="text-xs text-warm-gray">
                  We're preparing your order for shipment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/orders"
            className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:border-charcoal"
          >
            View Order History
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal-light"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
