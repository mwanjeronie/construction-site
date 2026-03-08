"use client";

import { useState } from "react";
import { FaSave, FaSpinner, FaPlus, FaTrash, FaChevronUp, FaChevronDown } from "react-icons/fa";
import ImageUploader from "./ImageUploader";
import IconPicker from "./IconPicker";
import type { SiteConfig, ServiceItem } from "@/types/config";

interface Props {
  config: SiteConfig;
  onSaved: (updated: SiteConfig) => void;
}

const newService = (): ServiceItem => ({
  id: Date.now().toString(),
  title: "New Service",
  description: "Description of this service.",
  icon: "FaBuilding",
  image: "",
});

export default function ServicesEditor({ config, onSaved }: Props) {
  const [services, setServices] = useState<ServiceItem[]>([...config.services]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(services[0]?.id ?? null);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services }),
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

  const update = (id: string, partial: Partial<ServiceItem>) => {
    setServices(services.map((s) => s.id === id ? { ...s, ...partial } : s));
  };

  const remove = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...services];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setServices(next);
  };

  const moveDown = (idx: number) => {
    if (idx === services.length - 1) return;
    const next = [...services];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    setServices(next);
  };

  return (
    <div className="space-y-4">
      {services.map((service, idx) => (
        <div key={service.id} className="border border-gray-200 rounded overflow-hidden">
          {/* Header */}
          <div
            className="flex items-center gap-3 bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setExpanded(expanded === service.id ? null : service.id)}
          >
            <div className="flex flex-col gap-1">
              <button type="button" onClick={(e) => { e.stopPropagation(); moveUp(idx); }} className="text-gray-400 hover:text-navy-700 leading-none" title="Move up">
                <FaChevronUp size={10} />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); moveDown(idx); }} className="text-gray-400 hover:text-navy-700 leading-none" title="Move down">
                <FaChevronDown size={10} />
              </button>
            </div>
            <span className="w-5 h-5 bg-navy-800 text-white text-xs rounded-sm flex items-center justify-center font-bold flex-shrink-0">
              {idx + 1}
            </span>
            <span className="flex-1 font-medium text-sm text-navy-800 truncate">{service.title}</span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); remove(service.id); }}
              className="text-red-400 hover:text-red-600 p-1"
              title="Delete"
            >
              <FaTrash size={12} />
            </button>
            <span className="text-gray-400 text-xs">{expanded === service.id ? "▲" : "▼"}</span>
          </div>

          {/* Expanded content */}
          {expanded === service.id && (
            <div className="p-4 space-y-4">
              <div>
                <label className="label">Title</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => update(service.id, { title: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea
                  rows={3}
                  value={service.description}
                  onChange={(e) => update(service.id, { description: e.target.value })}
                  className="textarea-field"
                />
              </div>
              <IconPicker
                value={service.icon}
                onChange={(icon) => update(service.id, { icon })}
                label="Service Icon"
              />
              <ImageUploader
                value={service.image}
                onChange={(image) => update(service.id, { image })}
                label="Service Image"
                aspectRatio="aspect-video"
              />
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => {
          const s = newService();
          setServices([...services, s]);
          setExpanded(s.id);
        }}
        className="flex items-center gap-2 w-full border-2 border-dashed border-gray-300 hover:border-navy-500 text-gray-500 hover:text-navy-700 rounded px-4 py-3 text-sm font-medium transition-colors"
      >
        <FaPlus size={12} /> Add New Service
      </button>

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
