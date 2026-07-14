import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { getProducts, getCategories } from "../lib/api";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/Skeletons";
import EmptyState from "../components/EmptyState";
import type { Product, Category } from "../data/types";

const PRODUCTS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const activeCategory = searchParams.get("category") || "";
  const activeSort = (searchParams.get("sort") as "price-asc" | "price-desc" | "newest" | "popular") || "popular";
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    Promise.all([
      getProducts({
        category: activeCategory || undefined,
        sort: activeSort,
        search: searchQuery || undefined,
      }),
      getCategories(),
    ]).then(([prods, cats]) => {
      setAllProducts(prods);
      setCategories(cats);
      setLoading(false);
    });
  }, [activeCategory, activeSort, searchQuery]);

  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(
    () =>
      allProducts.slice(
        (page - 1) * PRODUCTS_PER_PAGE,
        page * PRODUCTS_PER_PAGE
      ),
    [allProducts, page]
  );

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    if (key !== "sort") next.delete("page");
    setSearchParams(next);
    setPage(1);
  };

  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-charcoal">
              {activeCategory
                ? categories.find((c) => c.slug === activeCategory)?.name ||
                  "Products"
                : "All Products"}
            </h1>
            <p className="mt-1 text-sm text-warm-gray">
              {loading ? "Loading..." : `${allProducts.length} products`}
            </p>
          </div>
        </div>

        {/* Filters bar */}
        <div className="mt-6 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-xs">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              defaultValue={searchQuery}
              onChange={(e) => updateParam("q", e.target.value)}
              className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => updateParam("category", "")}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  !activeCategory
                    ? "bg-charcoal text-white"
                    : "border border-border text-warm-gray hover:border-charcoal hover:text-charcoal"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateParam("category", cat.slug)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    activeCategory === cat.slug
                      ? "bg-charcoal text-white"
                      : "border border-border text-warm-gray hover:border-charcoal hover:text-charcoal"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={activeSort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="rounded-xl border border-border bg-white px-3 py-2.5 text-xs font-medium text-charcoal focus:border-terracotta focus:outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : paginatedProducts.length === 0 ? (
            <EmptyState
              title="No products found"
              description="Try adjusting your search or filter to find what you're looking for."
              action={{
                label: "Clear all filters",
                href: "/products",
              }}
              icon={
                <svg
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-warm-gray transition-colors hover:border-charcoal hover:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`h-10 w-10 rounded-lg text-sm font-medium transition-all ${
                        page === i + 1
                          ? "bg-charcoal text-white"
                          : "text-warm-gray hover:bg-cream-dark"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-warm-gray transition-colors hover:border-charcoal hover:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
