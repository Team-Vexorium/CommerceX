import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getProduct } from "../lib/api";
import { formatPrice } from "../lib/format";
import { ProductDetailSkeleton } from "../components/Skeletons";
import { showToast } from "../components/Toast";
import type { Product, ProductVariant } from "../data/types";

const MOCK_REVIEWS = [
  {
    id: "rev-1",
    author: "Maren K.",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely beautiful quality. The materials feel premium and the craftsmanship is evident. Already planning my next order.",
  },
  {
    id: "rev-2",
    author: "James T.",
    rating: 5,
    date: "1 month ago",
    text: "This exceeded my expectations. The photos don't do it justice — the texture and weight feel much more premium in person.",
  },
  {
    id: "rev-3",
    author: "Sofia L.",
    rating: 4,
    date: "3 weeks ago",
    text: "Really nice piece. Took off one star only because shipping took a bit longer than expected, but the product itself is wonderful.",
  },
  {
    id: "rev-4",
    author: "Daniel R.",
    rating: 5,
    date: "5 days ago",
    text: "Third purchase from CommerceX and they keep delivering. This is the kind of quality you'd expect at twice the price.",
  },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, ProductVariant>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [activeReviewTab, setActiveReviewTab] = useState<"reviews" | "details">(
    "reviews"
  );

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProduct(id).then((p) => {
      if (p) {
        setProduct(p);
        // Auto-select first variant of each type
        const initial: Record<string, ProductVariant> = {};
        const variantTypes = new Set(p.variants?.map((v) => v.type) || []);
        variantTypes.forEach((type) => {
          const first = p.variants?.find(
            (v) => v.type === type && v.inStock
          );
          if (first) initial[type] = first;
        });
        setSelectedVariants(initial);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-light text-charcoal">
            Product not found
          </h2>
          <Link
            to="/products"
            className="mt-4 inline-block text-sm font-medium text-terracotta hover:text-terracotta-dark"
          >
            &larr; Back to products
          </Link>
        </div>
      </div>
    );
  }

  const variantTypes = [
    ...new Set(product.variants?.map((v) => v.type) || []),
  ];

  const handleAddToCart = () => {
    showToast(`${product.name} added to cart`);
  };

  return (
    <div className="animate-fade-in">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center gap-2 text-warm-gray">
            <li>
              <Link to="/" className="hover:text-charcoal transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                to="/products"
                className="hover:text-charcoal transition-colors"
              >
                Products
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                to={`/products?category=${product.category}`}
                className="hover:text-charcoal transition-colors capitalize"
              >
                {product.category.replace("-", " ")}
              </Link>
            </li>
            <li>/</li>
            <li className="text-charcoal font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Image gallery */}
          <div>
            <div className="aspect-square overflow-hidden rounded-2xl bg-cream-dark">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImage === i
                        ? "border-charcoal"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <p className="text-xs font-medium uppercase tracking-wider text-terracotta">
              {product.category.replace("-", " ")}
            </p>
            <h1 className="mt-2 text-3xl font-light tracking-tight text-charcoal sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating)
                        ? "text-terracotta"
                        : "text-border"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-warm-gray">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-light text-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-warm-gray-light line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 leading-relaxed text-warm-gray">
              {product.description}
            </p>

            {/* Variants */}
            {variantTypes.map((type) => {
              const variants = product.variants!.filter(
                (v) => v.type === type
              );
              return (
                <div key={type} className="mt-6">
                  <p className="text-sm font-medium text-charcoal capitalize">
                    {type}:{" "}
                    <span className="font-normal text-warm-gray">
                      {selectedVariants[type]?.label || "Select"}
                    </span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {variants.map((variant) => (
                      <button
                        key={variant.value}
                        disabled={!variant.inStock}
                        onClick={() =>
                          setSelectedVariants((prev) => ({
                            ...prev,
                            [type]: variant,
                          }))
                        }
                        className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                          selectedVariants[type]?.value === variant.value
                            ? "border-charcoal bg-charcoal text-white"
                            : variant.inStock
                              ? "border-border text-charcoal hover:border-charcoal"
                              : "border-border text-warm-gray-light cursor-not-allowed line-through"
                        }`}
                      >
                        {variant.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Quantity + Add to Cart */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center rounded-xl border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center text-warm-gray transition-colors hover:text-charcoal"
                >
                  &minus;
                </button>
                <span className="w-12 text-center text-sm font-medium text-charcoal">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-12 w-12 items-center justify-center text-warm-gray transition-colors hover:text-charcoal"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 rounded-xl bg-charcoal py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-charcoal-light hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>

            {/* Trust signals */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
              <div className="text-center">
                <svg
                  className="mx-auto h-5 w-5 text-warm-gray-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21A2.25 2.25 0 0023.25 18V6.75A2.25 2.25 0 0021 4.5H3A2.25 2.25 0 00.75 6.75v11.25c0 .621.504 1.125 1.125 1.125h14.25"
                  />
                </svg>
                <p className="mt-2 text-xs text-warm-gray">
                  Free shipping over $100
                </p>
              </div>
              <div className="text-center">
                <svg
                  className="mx-auto h-5 w-5 text-warm-gray-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                  />
                </svg>
                <p className="mt-2 text-xs text-warm-gray">
                  30-day returns
                </p>
              </div>
              <div className="text-center">
                <svg
                  className="mx-auto h-5 w-5 text-warm-gray-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
                <p className="mt-2 text-xs text-warm-gray">
                  Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Reviews / Details */}
        <div className="mt-16 border-t border-border pt-12">
          <div className="flex gap-8 border-b border-border">
            <button
              onClick={() => setActiveReviewTab("reviews")}
              className={`pb-4 text-sm font-medium transition-colors border-b-2 ${
                activeReviewTab === "reviews"
                  ? "border-charcoal text-charcoal"
                  : "border-transparent text-warm-gray hover:text-charcoal"
              }`}
            >
              Reviews ({MOCK_REVIEWS.length})
            </button>
            <button
              onClick={() => setActiveReviewTab("details")}
              className={`pb-4 text-sm font-medium transition-colors border-b-2 ${
                activeReviewTab === "details"
                  ? "border-charcoal text-charcoal"
                  : "border-transparent text-warm-gray hover:text-charcoal"
              }`}
            >
              Details
            </button>
          </div>

          {activeReviewTab === "reviews" ? (
            <div className="space-y-8 py-8">
              {MOCK_REVIEWS.map((review) => (
                <div key={review.id} className="border-b border-border pb-8 last:border-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-charcoal">
                        {review.author}
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "text-terracotta"
                                : "text-border"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-warm-gray-light">
                      {review.date}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-warm-gray">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-charcoal">
                    Materials
                  </h4>
                  <p className="mt-2 text-sm text-warm-gray">
                    {product.tags.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(", ")}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-charcoal">
                    Category
                  </h4>
                  <p className="mt-2 text-sm text-warm-gray capitalize">
                    {product.category.replace("-", " ")}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-charcoal">
                    Rating
                  </h4>
                  <p className="mt-2 text-sm text-warm-gray">
                    {product.rating} / 5 ({product.reviewCount} reviews)
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-charcoal">
                    Availability
                  </h4>
                  <p className="mt-2 text-sm text-warm-gray">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
