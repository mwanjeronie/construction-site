"use client";

import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-2 text-gray-300 hover:text-red-400 text-sm transition-colors"
    >
      <FaSignOutAlt size={14} /> Logout
    </button>
  );
}
