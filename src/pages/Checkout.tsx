import { useState } from "react";
import { useNavigate } from "react-router";
import { useCartStore } from "../store/cart";
import { placeOrder } from "../lib/api";
import { formatPrice } from "../lib/format";
import type { ShippingAddress } from "../data/types";

interface FormErrors {
  [key: string]: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const subtotal = items.reduce((sum, item) => sum + item.quantity * 50, 0); // rough estimate
  const shipping = subtotal > 100 ? 0 : 12;

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email";
    if (!form.address.trim()) errs.address = "Required";
    if (!form.city.trim()) errs.city = "Required";
    if (!form.state.trim()) errs.state = "Required";
    if (!form.zip.trim()) errs.zip = "Required";
    if (!payment.cardNumber.trim()) errs.cardNumber = "Required";
    else if (payment.cardNumber.replace(/\s/g, "").length < 16)
      errs.cardNumber = "Enter a valid card number";
    if (!payment.expiry.trim()) errs.expiry = "Required";
    else if (!/^\d{2}\/\d{2}$/.test(payment.expiry))
      errs.expiry = "MM/YY";
    if (!payment.cvc.trim()) errs.cvc = "Required";
    else if (payment.cvc.length < 3) errs.cvc = "Invalid";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const order = await placeOrder({ items, shippingAddress: form });
      // Store order in localStorage
      const stored = localStorage.getItem("commercex-orders");
      const orders = stored ? JSON.parse(stored) : [];
      orders.push(order);
      localStorage.setItem("commercex-orders", JSON.stringify(orders));
      clearCart();
      navigate(`/orders/${order.id}`);
    } catch {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const FieldError = ({ field }: { field: string }) =>
    errors[field] ? (
      <p className="mt-1 text-xs text-terracotta">{errors[field]}</p>
    ) : null;

  return (
    <div className="animate-fade-in">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h1 className="text-3xl font-light tracking-tight text-charcoal">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {/* Shipping */}
            <div className="rounded-2xl border border-border bg-white p-6">
              <h2 className="text-lg font-medium text-charcoal">
                Shipping Address
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-charcoal">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta ${
                      errors.firstName ? "border-terracotta" : "border-border"
                    }`}
                  />
                  <FieldError field="firstName" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta ${
                      errors.lastName ? "border-terracotta" : "border-border"
                    }`}
                  />
                  <FieldError field="lastName" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-charcoal">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta ${
                      errors.email ? "border-terracotta" : "border-border"
                    }`}
                  />
                  <FieldError field="email" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-charcoal">
                    Address
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta ${
                      errors.address ? "border-terracotta" : "border-border"
                    }`}
                  />
                  <FieldError field="address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal">
                    City
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                    className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta ${
                      errors.city ? "border-terracotta" : "border-border"
                    }`}
                  />
                  <FieldError field="city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal">
                    State
                  </label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                    className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta ${
                      errors.state ? "border-terracotta" : "border-border"
                    }`}
                  />
                  <FieldError field="state" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={form.zip}
                    onChange={(e) =>
                      setForm({ ...form, zip: e.target.value })
                    }
                    className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta ${
                      errors.zip ? "border-terracotta" : "border-border"
                    }`}
                  />
                  <FieldError field="zip" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal">
                    Country
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) =>
                      setForm({ ...form, country: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="mt-6 rounded-2xl border border-border bg-white p-6">
              <h2 className="text-lg font-medium text-charcoal">
                Payment Details
              </h2>
              <p className="mt-1 text-xs text-warm-gray-light">
                This is a demo — no real payment is processed
              </p>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    value={payment.cardNumber}
                    onChange={(e) =>
                      setPayment({
                        ...payment,
                        cardNumber: formatCardNumber(e.target.value),
                      })
                    }
                    maxLength={19}
                    className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta ${
                      errors.cardNumber ? "border-terracotta" : "border-border"
                    }`}
                  />
                  <FieldError field="cardNumber" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={(e) =>
                        setPayment({
                          ...payment,
                          expiry: formatExpiry(e.target.value),
                        })
                      }
                      maxLength={5}
                      className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta ${
                        errors.expiry ? "border-terracotta" : "border-border"
                      }`}
                    />
                    <FieldError field="expiry" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={payment.cvc}
                      onChange={(e) =>
                        setPayment({
                          ...payment,
                          cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                        })
                      }
                      maxLength={4}
                      className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta ${
                        errors.cvc ? "border-terracotta" : "border-border"
                      }`}
                    />
                    <FieldError field="cvc" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="mt-8 lg:col-span-5 lg:mt-0">
            <div className="sticky top-24 rounded-2xl border border-border bg-white p-6">
              <h2 className="text-lg font-medium text-charcoal">
                Order Summary
              </h2>
              <div className="mt-6 max-h-64 divide-y divide-border overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-cream-dark" />
                      <div>
                        <p className="text-sm font-medium text-charcoal line-clamp-1">
                          {item.productId}
                        </p>
                        <p className="text-xs text-warm-gray">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Subtotal</span>
                  <span className="font-medium text-charcoal">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Shipping</span>
                  <span className="font-medium text-charcoal">
                    {shipping === 0 ? (
                      <span className="text-sage">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-charcoal">
                      Total
                    </span>
                    <span className="text-base font-semibold text-charcoal">
                      {formatPrice(subtotal + shipping)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-6 block w-full rounded-xl bg-charcoal py-3.5 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-charcoal-light hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Place Order"
                )}
              </button>
              <p className="mt-4 text-center text-xs text-warm-gray-light">
                Your order will be confirmed instantly (this is a demo)
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
