import { useEffect, useState } from "react";
import { getOrders } from "../lib/api";
import { formatPrice, formatDate } from "../lib/format";
import type { Order } from "../data/types";

const STATUS_COLORS: Record<Order["status"], string> = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-emerald-100 text-emerald-800",
};

// Generate some fake historical orders for the admin view
function generateMockOrders(): Order[] {
  const statuses: Order["status"][] = [
    "pending",
    "processing",
    "shipped",
    "delivered",
  ];
  return Array.from({ length: 8 }).map((_, i) => ({
    id: `CMX-DEMO-${String(i + 1).padStart(3, "0")}`,
    items: [
      {
        productId: `prod-${String(Math.floor(Math.random() * 21) + 1).padStart(3, "0")}`,
        quantity: Math.floor(Math.random() * 3) + 1,
      },
    ],
    subtotal: Math.floor(Math.random() * 300) + 40,
    shipping: 0,
    total: Math.floor(Math.random() * 300) + 40,
    status: statuses[i % statuses.length],
    shippingAddress: {
      firstName: "Customer",
      lastName: `#${i + 1}`,
      email: `customer${i + 1}@example.com`,
      address: "123 Demo Street",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "US",
    },
    createdAt: new Date(
      Date.now() - i * 2 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((realOrders) => {
      const mockOrders = generateMockOrders();
      const all = [...realOrders, ...mockOrders].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setOrders(all);
      setLoading(false);
    });
  }, []);

  return (
    <div className="animate-fade-in">
      <div>
        <h1 className="text-2xl font-light text-charcoal">Orders</h1>
        <p className="mt-1 text-sm text-warm-gray">
          {orders.length} total orders
        </p>
      </div>

      {loading ? (
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-2xl bg-cream-dark"
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-warm-gray">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-warm-gray">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-warm-gray">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-warm-gray">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-warm-gray">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-cream/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium text-charcoal">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-charcoal">
                        {order.shippingAddress.firstName}{" "}
                        {order.shippingAddress.lastName}
                      </p>
                      <p className="text-xs text-warm-gray-light">
                        {order.shippingAddress.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-warm-gray">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_COLORS[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-charcoal">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
