import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getOrders } from "../lib/api";
import { formatPrice, formatDate } from "../lib/format";
import EmptyState from "../components/EmptyState";
import type { Order } from "../data/types";

const STATUS_COLORS: Record<Order["status"], string> = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-emerald-100 text-emerald-800",
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((o) => {
      setOrders(o.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      setLoading(false);
    });
  }, []);

  if (!loading && orders.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <EmptyState
          title="No orders yet"
          description="When you place an order, it will appear here. Start by exploring our collection."
          action={{
            label: "Start Shopping",
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
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
          Order History
        </h1>

        {loading ? (
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl bg-cream-dark"
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block rounded-2xl border border-border bg-white p-6 transition-all hover:shadow-md hover:border-charcoal/20"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-cream" />
                    <div>
                      <p className="font-mono text-sm font-medium text-charcoal">
                        {order.id}
                      </p>
                      <p className="mt-0.5 text-xs text-warm-gray">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_COLORS[order.status]}`}
                    >
                      {order.status}
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-charcoal">
                        {formatPrice(order.total)}
                      </p>
                      <p className="text-xs text-warm-gray">
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
