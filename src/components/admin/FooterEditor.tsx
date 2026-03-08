"use client";

import { useState } from "react";
import { FaSave, FaSpinner } from "react-icons/fa";
import type { SiteConfig } from "@/types/config";

interface Props {
  config: SiteConfig;
  onSaved: (updated: SiteConfig) => void;
}

export default function FooterEditor({ config, onSaved }: Props) {
  const [footer, setFooter] = useState({ ...config.footer });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ footer }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.error || "Save failed");
      onSaved(data.config);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="label">Copyright Text</label>
        <input
          type="text"
          value={footer.copyright}
          onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
          className="input-field"
          placeholder="© 2024 Company Name. All rights reserved."
        />
      </div>
      <div>
        <label className="label">Office Hours</label>
        <input
          type="text"
          value={footer.hours}
          onChange={(e) => setFooter({ ...footer, hours: e.target.value })}
          className="input-field"
          placeholder="Mon – Fri: 8:00 AM – 6:00 PM"
        />
      </div>
      <div>
        <label className="label">Footer Tagline</label>
        <textarea
          rows={2}
          value={footer.tagline}
          onChange={(e) => setFooter({ ...footer, tagline: e.target.value })}
          className="textarea-field"
          placeholder="Short description in the footer..."
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="admin-save-btn"
      >
        {saving ? <FaSpinner className="animate-spin" size={14} /> : <FaSave size={14} />}
        {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
