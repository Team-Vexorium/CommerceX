import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/auth";
import { showToast } from "../components/Toast";

export default function Account() {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuthStore();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [editing, setEditing] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSave = () => {
    updateProfile({ firstName, lastName });
    setEditing(false);
    showToast("Profile updated");
  };

  return (
    <div className="animate-fade-in">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h1 className="text-3xl font-light tracking-tight text-charcoal">
          My Account
        </h1>

        <div className="mt-8 rounded-2xl border border-border bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-charcoal">
              Profile Information
            </h2>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditing(false);
                    setFirstName(user.firstName);
                    setLastName(user.lastName);
                  }}
                  className="text-sm text-warm-gray hover:text-charcoal transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-charcoal">
                  First Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                ) : (
                  <p className="mt-1 text-sm text-warm-gray">
                    {user.firstName || "Not set"}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal">
                  Last Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                ) : (
                  <p className="mt-1 text-sm text-warm-gray">
                    {user.lastName || "Not set"}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal">
                Email
              </label>
              <p className="mt-1 text-sm text-warm-gray">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-white p-6 sm:p-8">
          <h2 className="text-lg font-medium text-charcoal">Quick Links</h2>
          <div className="mt-4 space-y-3">
            <a
              href="/orders"
              className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:border-charcoal"
            >
              Order History
              <svg
                className="h-4 w-4 text-warm-gray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="mt-6 w-full rounded-xl border border-border py-3 text-sm font-medium text-warm-gray transition-colors hover:border-terracotta hover:text-terracotta"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
