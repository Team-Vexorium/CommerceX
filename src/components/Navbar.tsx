import { Link } from "react-router";
import { useCartStore } from "../store/cart";
import { useAuthStore } from "../store/auth";

export default function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-cream/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl font-medium tracking-tight text-charcoal"
            >
              CommerceX
            </Link>
            <div className="hidden items-center gap-6 sm:flex">
              <Link
                to="/products"
                className="text-sm text-warm-gray transition-colors hover:text-charcoal"
              >
                All Products
              </Link>
              <Link
                to="/products?category=home-goods"
                className="text-sm text-warm-gray transition-colors hover:text-charcoal"
              >
                Home Goods
              </Link>
              <Link
                to="/products?category=apparel"
                className="text-sm text-warm-gray transition-colors hover:text-charcoal"
              >
                Apparel
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative text-sm text-warm-gray transition-colors hover:text-charcoal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-terracotta text-[10px] font-bold text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
            <Link
              to="/orders"
              className="hidden text-sm text-warm-gray transition-colors hover:text-charcoal sm:block"
            >
              Orders
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/account"
                  className="hidden text-sm text-warm-gray transition-colors hover:text-charcoal sm:block"
                >
                  {user.firstName || user.email}
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-warm-gray-light transition-colors hover:text-charcoal"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm text-warm-gray transition-colors hover:text-charcoal"
              >
                Login
              </Link>
            )}
            <Link
              to="/admin"
              className="hidden text-sm text-warm-gray transition-colors hover:text-charcoal lg:block"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
