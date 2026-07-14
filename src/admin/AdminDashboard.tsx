import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { products } from "../data/products";

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 6100 },
  { month: "Apr", revenue: 7400 },
  { month: "May", revenue: 8200 },
  { month: "Jun", revenue: 7900 },
];

const ordersData = [
  { month: "Jan", orders: 28 },
  { month: "Feb", orders: 42 },
  { month: "Mar", orders: 51 },
  { month: "Apr", orders: 63 },
  { month: "May", orders: 78 },
  { month: "Jun", orders: 72 },
];

const topProducts = [...products]
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 5);

export default function AdminDashboard() {
  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = ordersData.reduce((s, d) => s + d.orders, 0);

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-2xl font-light text-charcoal">Dashboard</h1>
        <p className="mt-1 text-sm text-warm-gray">
          Welcome back. Here's your store overview.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            change: "+12.5%",
            positive: true,
          },
          {
            label: "Total Orders",
            value: totalOrders.toString(),
            change: "+8.2%",
            positive: true,
          },
          {
            label: "Products",
            value: products.length.toString(),
            change: "Active",
            positive: true,
          },
          {
            label: "Avg. Order Value",
            value: `$${Math.round(totalRevenue / totalOrders)}`,
            change: "+3.1%",
            positive: true,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-white p-6"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-warm-gray">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-light text-charcoal">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium text-sage">
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue chart */}
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="text-sm font-medium text-charcoal">Revenue</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E0D8"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6B635B" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B635B" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1A1A",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                />
                <Bar
                  dataKey="revenue"
                  fill="#C4654A"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders chart */}
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="text-sm font-medium text-charcoal">Orders</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ordersData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E0D8"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6B635B" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B635B" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1A1A",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#C4654A"
                  strokeWidth={2}
                  dot={{ fill: "#C4654A", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top products */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <h3 className="text-sm font-medium text-charcoal">Top Products</h3>
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-warm-gray">
                  Product
                </th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-warm-gray">
                  Category
                </th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-warm-gray">
                  Price
                </th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-warm-gray">
                  Reviews
                </th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-warm-gray">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topProducts.map((product, i) => (
                <tr key={product.id}>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-warm-gray-light">
                        #{i + 1}
                      </span>
                      <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg bg-cream-dark">
                        <img
                          src={product.images[0]}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-charcoal">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-xs text-warm-gray capitalize">
                      {product.category.replace("-", " ")}
                    </span>
                  </td>
                  <td className="py-3 text-right text-sm text-charcoal">
                    ${product.price}
                  </td>
                  <td className="py-3 text-right text-sm text-warm-gray">
                    {product.reviewCount}
                  </td>
                  <td className="py-3 text-right text-sm text-charcoal">
                    {product.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
