"use client";

import { useState } from "react";
import { FaSave, FaSpinner } from "react-icons/fa";
import ImageUploader from "./ImageUploader";
import type { SiteConfig } from "@/types/config";

interface Props {
  config: SiteConfig;
  onSaved: (updated: SiteConfig) => void;
}

export default function HeroEditor({ config, onSaved }: Props) {
  const [hero, setHero] = useState({ ...config.hero });
  const [stats, setStats] = useState([...config.stats]);
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
        body: JSON.stringify({ hero, stats }),
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

  const updateStat = (idx: number, field: "label" | "value", val: string) => {
    const updated = stats.map((s, i) => i === idx ? { ...s, [field]: val } : s);
    setStats(updated);
  };

  const addStat = () => setStats([...stats, { label: "New Stat", value: "0+" }]);
  const removeStat = (idx: number) => setStats(stats.filter((_, i) => i !== idx));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-navy-800 text-base mb-4 pb-2 border-b border-gray-200">
          Hero Section
        </h3>
        <div className="space-y-4">
          <div>
            <label className="label">Main Headline</label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Subtitle</label>
            <textarea
              rows={3}
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              className="textarea-field"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">CTA Button Text</label>
              <input
                type="text"
                value={hero.cta_text}
                onChange={(e) => setHero({ ...hero, cta_text: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">CTA Button Link</label>
              <input
                type="text"
                value={hero.cta_link}
                onChange={(e) => setHero({ ...hero, cta_link: e.target.value })}
                className="input-field"
                placeholder="/contact"
              />
            </div>
          </div>
          <ImageUploader
            value={hero.background_image}
            onChange={(url) => setHero({ ...hero, background_image: url })}
            label="Background Image"
            aspectRatio="aspect-video"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
          <h3 className="font-semibold text-navy-800 text-base">Stats / Counters</h3>
          <button
            type="button"
            onClick={addStat}
            className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold px-3 py-1.5 rounded transition-colors"
          >
            + Add Stat
          </button>
        </div>
        <div className="space-y-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded p-3">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <label className="label text-xs">Value (e.g. &quot;500+&quot;)</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(idx, "value", e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="label text-xs">Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(idx, "label", e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeStat(idx)}
                className="text-red-400 hover:text-red-600 mt-4 flex-shrink-0"
                title="Remove"
              >
                ×
              </button>
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
