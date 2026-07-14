import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getFeaturedProducts, getCategories } from "../lib/api";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/Skeletons";
import type { Product, Category } from "../data/types";

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getFeaturedProducts(4), getCategories()]).then(
      ([prods, cats]) => {
        setFeatured(prods);
        setCategories(cats);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-terracotta">
            Curated Lifestyle Goods
          </p>
          <h1 className="mt-4 text-5xl font-light tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
            Objects for
            <br />
            <span className="font-medium">everyday living</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-warm-gray">
            Thoughtfully made home goods, apparel, and accessories. Each piece
            chosen for craft, utility, and quiet beauty.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center rounded-full bg-charcoal px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-charcoal-light hover:shadow-lg"
            >
              Shop All
            </Link>
            <Link
              to="/products?category=home-goods"
              className="inline-flex items-center rounded-full border border-border px-8 py-3.5 text-sm font-medium text-charcoal transition-all duration-200 hover:border-charcoal"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                    Collection
                  </p>
                  <h3 className="mt-1 text-xl font-medium text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="text-2xl font-light tracking-tight text-charcoal sm:text-3xl">
              Most Loved
            </h2>
            <p className="mt-2 text-sm text-warm-gray">
              Our highest-rated pieces, chosen by the community
            </p>
          </div>
          <Link
            to="/products"
            className="hidden text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors sm:block"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/products"
            className="text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors"
          >
            View all products &rarr;
          </Link>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-charcoal py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-terracotta-light">
                Our Philosophy
              </p>
              <h2 className="mt-4 text-3xl font-light text-white sm:text-4xl">
                Less, but better
              </h2>
              <p className="mt-6 text-warm-gray-light leading-relaxed">
                We believe in fewer, finer things. Every product in our
                collection is selected for its materials, craftsmanship, and
                ability to bring quiet joy to daily routines. We work with
                makers who share our commitment to quality over quantity.
              </p>
              <Link
                to="/products"
                className="mt-8 inline-flex items-center rounded-full border border-warm-gray px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white"
              >
                Explore the collection
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
                    alt="Curated materials"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80"
                    alt="Craftsmanship"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-light text-charcoal sm:text-3xl">
            Stay in the loop
          </h2>
          <p className="mt-3 text-warm-gray">
            New arrivals, maker stories, and exclusive offers. No spam, ever.
          </p>
          <div className="mt-8 flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-l-xl border border-border bg-white px-5 py-3.5 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
            />
            <button className="rounded-r-xl bg-charcoal px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-charcoal-light">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
