import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-charcoal">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/products" className="text-sm text-warm-gray hover:text-charcoal transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=home-goods" className="text-sm text-warm-gray hover:text-charcoal transition-colors">
                  Home Goods
                </Link>
              </li>
              <li>
                <Link to="/products?category=apparel" className="text-sm text-warm-gray hover:text-charcoal transition-colors">
                  Apparel
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-sm text-warm-gray hover:text-charcoal transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-charcoal">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="text-sm text-warm-gray">About Us</span>
              </li>
              <li>
                <span className="text-sm text-warm-gray">Sustainability</span>
              </li>
              <li>
                <span className="text-sm text-warm-gray">Press</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-charcoal">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="text-sm text-warm-gray">Shipping & Returns</span>
              </li>
              <li>
                <span className="text-sm text-warm-gray">FAQ</span>
              </li>
              <li>
                <span className="text-sm text-warm-gray">Contact</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-charcoal">
              Stay in Touch
            </h3>
            <p className="mt-4 text-sm text-warm-gray">
              Join our newsletter for new arrivals and exclusive offers.
            </p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-l-lg border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none"
              />
              <button className="rounded-r-lg bg-charcoal px-4 py-2.5 text-sm font-medium text-white hover:bg-charcoal-light transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-xs text-warm-gray-light">
            &copy; 2026 CommerceX. All rights reserved. This is a demo project — no real transactions occur.
          </p>
        </div>
      </div>
    </footer>
  );
}
