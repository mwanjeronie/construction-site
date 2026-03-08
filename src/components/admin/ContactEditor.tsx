"use client";

import { useState } from "react";
import { FaSave, FaSpinner } from "react-icons/fa";
import type { SiteConfig } from "@/types/config";

interface Props {
  config: SiteConfig;
  onSaved: (updated: SiteConfig) => void;
}

export default function ContactEditor({ config, onSaved }: Props) {
  const [contact, setContact] = useState({ ...config.contact });
  const [social, setSocial] = useState({ ...config.social_links });
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
        body: JSON.stringify({ contact, social_links: social }),
      });
      const data = await res.json();
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
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold text-navy-800 text-base mb-4 pb-2 border-b border-gray-200">
          Contact Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="label">Phone Number</label>
            <input
              type="text"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              className="input-field"
              placeholder="+256 700 000 000"
            />
          </div>
          <div>
            <label className="label">Email Address</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="input-field"
              placeholder="info@company.com"
            />
          </div>
          <div>
            <label className="label">Physical Address</label>
            <input
              type="text"
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              className="input-field"
              placeholder="Plot 45, Kampala Road, Kampala, Uganda"
            />
          </div>
          <div>
            <label className="label">WhatsApp Number (digits only, with country code)</label>
            <input
              type="text"
              value={contact.whatsapp}
              onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
              className="input-field"
              placeholder="+256700000000"
            />
          </div>
          <div>
            <label className="label">Google Maps Embed URL</label>
            <textarea
              rows={3}
              value={contact.map_url}
              onChange={(e) => setContact({ ...contact, map_url: e.target.value })}
              className="textarea-field"
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <p className="text-xs text-gray-400 mt-1">
              Go to Google Maps → Share → Embed a map → Copy the src URL from the iframe code
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-navy-800 text-base mb-4 pb-2 border-b border-gray-200">
          Social Media Links
        </h3>
        <div className="space-y-4">
          {[
            { key: "facebook", label: "Facebook URL" },
            { key: "twitter", label: "Twitter/X URL" },
            { key: "linkedin", label: "LinkedIn URL" },
            { key: "youtube", label: "YouTube URL (optional)" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input
                type="url"
                value={social[key as keyof typeof social]}
                onChange={(e) => setSocial({ ...social, [key]: e.target.value })}
                className="input-field"
                placeholder={`https://${key}.com/yourpage`}
              />
            </div>
          ))}
        </div>
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
