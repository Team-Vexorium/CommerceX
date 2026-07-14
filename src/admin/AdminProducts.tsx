import { useState } from "react";
import { showToast } from "../components/Toast";
import { formatPrice } from "../lib/format";
import type { Product } from "../data/types";
import { products as initialProducts } from "../data/products";

export default function AdminProducts() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "home-goods",
    description: "",
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted");
    }
  };

  const handleEdit = (product: Product) => {
    setEditing(product.id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) return;
    setProductList((prev) =>
      prev.map((p) =>
        p.id === editing
          ? {
              ...p,
              name: formData.name,
              price: parseFloat(formData.price),
              category: formData.category,
              description: formData.description,
            }
          : p
      )
    );
    setEditing(null);
    setFormData({ name: "", price: "", category: "home-goods", description: "" });
    showToast("Product updated");
  };

  const handleAdd = () => {
    if (!formData.name || !formData.price) return;
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"],
      tags: [],
      rating: 0,
      reviewCount: 0,
      inStock: true,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProductList((prev) => [newProduct, ...prev]);
    setShowAddForm(false);
    setFormData({ name: "", price: "", category: "home-goods", description: "" });
    showToast("Product added");
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-charcoal">Products</h1>
          <p className="mt-1 text-sm text-warm-gray">
            {productList.length} products in catalog
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="rounded-xl bg-charcoal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-charcoal-light"
        >
          + Add Product
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          <h3 className="text-sm font-medium text-charcoal">New Product</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Product name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
            />
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
            >
              <option value="home-goods">Home Goods</option>
              <option value="apparel">Apparel</option>
              <option value="accessories">Accessories</option>
              <option value="stationery">Stationery</option>
            </select>
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta sm:col-span-2"
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleAdd}
              className="rounded-xl bg-charcoal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-charcoal-light"
            >
              Add Product
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-warm-gray transition-colors hover:border-charcoal hover:text-charcoal"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-warm-gray">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-warm-gray">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-warm-gray">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-warm-gray">
                Stock
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-warm-gray">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {productList.map((product) => (
              <tr key={product.id} className="hover:bg-cream/50 transition-colors">
                <td className="px-6 py-4">
                  {editing === product.id ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-border px-3 py-1.5 text-sm focus:border-terracotta focus:outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-cream-dark">
                        <img
                          src={product.images[0]}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          {product.name}
                        </p>
                        <p className="text-xs text-warm-gray-light">
                          {product.id}
                        </p>
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-warm-gray capitalize">
                    {product.category.replace("-", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {editing === product.id ? (
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-24 rounded-lg border border-border px-3 py-1.5 text-sm focus:border-terracotta focus:outline-none"
                    />
                  ) : (
                    <span className="text-sm font-medium text-charcoal">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      product.inStock
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {editing === product.id ? (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleSave}
                        className="rounded-lg bg-charcoal px-3 py-1.5 text-xs font-medium text-white hover:bg-charcoal-light"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-warm-gray hover:border-charcoal"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-warm-gray transition-colors hover:border-charcoal hover:text-charcoal"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-warm-gray transition-colors hover:border-terracotta hover:text-terracotta"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
