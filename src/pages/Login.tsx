import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuthStore } from "../store/auth";

export default function Login() {
  const navigate = useNavigate();
  const { login, signup } = useAuthStore();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (isSignup && (!firstName || !lastName)) {
      setError("Please fill in all fields");
      return;
    }
    if (isSignup) {
      signup(email, password, firstName, lastName);
    } else {
      login(email, password);
    }
    navigate("/account");
  };

  return (
    <div className="animate-fade-in">
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-tight text-charcoal">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="mt-2 text-sm text-warm-gray">
            {isSignup
              ? "Join us to track orders and save your preferences"
              : "Sign in to your CommerceX account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {isSignup && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                  placeholder="Doe"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-charcoal">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray-light focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
              placeholder="Any password works"
            />
          </div>
          {error && (
            <p className="text-sm text-terracotta">{error}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-xl bg-charcoal py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-charcoal-light hover:shadow-lg"
          >
            {isSignup ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="text-sm text-warm-gray hover:text-charcoal transition-colors"
          >
            {isSignup
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-xs text-warm-gray-light hover:text-charcoal transition-colors"
          >
            &larr; Back to store
          </Link>
        </div>
      </div>
    </div>
  );
}
