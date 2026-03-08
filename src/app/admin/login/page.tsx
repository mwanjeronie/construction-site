"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHardHat, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
        backgroundSize: "20px 20px",
      }} />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-sm shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-navy-800 px-8 py-8 text-center">
            <div className="w-14 h-14 bg-amber-500 rounded-sm flex items-center justify-center mx-auto mb-4">
              <FaHardHat size={28} className="text-white" />
            </div>
            <h1 className="font-heading font-black text-white text-xl">Admin Panel</h1>
            <p className="text-gray-400 text-xs mt-1">Construction Site Management</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            <div>
              <label className="label">Username</label>
              <input
                type="text"
                required
                autoComplete="username"
                placeholder="Enter username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPass ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy-800 hover:bg-navy-900 text-white font-semibold py-3 rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" size={16} /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Back link */}
        <p className="text-center mt-6">
          <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Back to Website
          </a>
        </p>
      </div>
    </div>
  );
}
