import { Link } from "react-router";
import { formatPrice } from "../lib/format";
import type { Product } from "../data/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block animate-fade-in"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-dark">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-terracotta px-3 py-1 text-xs font-medium text-white">
            Sale
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-warm-gray-light">
          {product.category.replace("-", " ")}
        </p>
        <h3 className="mt-1 text-base font-medium text-charcoal group-hover:text-terracotta transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-charcoal">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-warm-gray-light line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-3 w-3 ${
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
          <span className="text-xs text-warm-gray-light">
            ({product.reviewCount})
          </span>
        </div>
      </div>
    </Link>
  );
}
