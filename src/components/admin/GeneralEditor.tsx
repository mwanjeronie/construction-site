"use client";

import { useState } from "react";
import { FaSave, FaSpinner } from "react-icons/fa";
import ImageUploader from "./ImageUploader";
import type { SiteConfig } from "@/types/config";

interface Props {
  config: SiteConfig;
  onSaved: (updated: SiteConfig) => void;
}

export default function GeneralEditor({ config, onSaved }: Props) {
  const [form, setForm] = useState({
    company_name: config.company_name,
    tagline: config.tagline,
    logo_url: config.logo_url,
    favicon_url: config.favicon_url,
  });
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
        body: JSON.stringify(form),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.error || `Save failed (${res.status})`);
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
    <div className="space-y-6">
      <div>
        <label className="label">Company Name</label>
        <input
          type="text"
          value={form.company_name}
          onChange={(e) => setForm({ ...form, company_name: e.target.value })}
          className="input-field"
          placeholder="BuildRight Uganda Ltd"
        />
      </div>
      <div>
        <label className="label">Company Tagline</label>
        <input
          type="text"
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          className="input-field"
          placeholder="Building Uganda's Future..."
        />
      </div>
      <ImageUploader
        value={form.logo_url}
        onChange={(url) => setForm({ ...form, logo_url: url })}
        label="Company Logo"
        aspectRatio="aspect-[3/1] max-w-xs"
      />
      <ImageUploader
        value={form.favicon_url}
        onChange={(url) => setForm({ ...form, favicon_url: url })}
        label="Favicon (browser tab icon)"
        aspectRatio="aspect-square max-w-[80px]"
      />

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
