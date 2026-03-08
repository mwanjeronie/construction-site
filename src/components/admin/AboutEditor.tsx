"use client";

import { useState } from "react";
import { FaSave, FaSpinner, FaPlus, FaTrash } from "react-icons/fa";
import ImageUploader from "./ImageUploader";
import type { SiteConfig } from "@/types/config";

interface Props {
  config: SiteConfig;
  onSaved: (updated: SiteConfig) => void;
}

export default function AboutEditor({ config, onSaved }: Props) {
  const [about, setAbout] = useState({ ...config.about });
  const [team, setTeam] = useState([...config.team]);
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
        body: JSON.stringify({ about, team }),
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

  const addMember = () =>
    setTeam([...team, { id: Date.now().toString(), name: "", role: "", image: "" }]);

  const updateMember = (id: string, field: string, val: string) =>
    setTeam(team.map((m) => m.id === id ? { ...m, [field]: val } : m));

  const removeMember = (id: string) => setTeam(team.filter((m) => m.id !== id));

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold text-navy-800 text-base mb-4 pb-2 border-b border-gray-200">
          About Section
        </h3>
        <div className="space-y-4">
          <div>
            <label className="label">Section Title</label>
            <input
              type="text"
              value={about.title}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Subtitle</label>
            <input
              type="text"
              value={about.subtitle}
              onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Main Content / Story</label>
            <textarea
              rows={6}
              value={about.content}
              onChange={(e) => setAbout({ ...about, content: e.target.value })}
              className="textarea-field"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Mission Statement</label>
              <textarea
                rows={3}
                value={about.mission}
                onChange={(e) => setAbout({ ...about, mission: e.target.value })}
                className="textarea-field"
              />
            </div>
            <div>
              <label className="label">Vision Statement</label>
              <textarea
                rows={3}
                value={about.vision}
                onChange={(e) => setAbout({ ...about, vision: e.target.value })}
                className="textarea-field"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Year Founded</label>
              <input
                type="text"
                value={about.founded}
                onChange={(e) => setAbout({ ...about, founded: e.target.value })}
                className="input-field"
                placeholder="2010"
              />
            </div>
            <div>
              <label className="label">Number of Employees</label>
              <input
                type="text"
                value={about.employees}
                onChange={(e) => setAbout({ ...about, employees: e.target.value })}
                className="input-field"
                placeholder="200+"
              />
            </div>
          </div>
          <ImageUploader
            value={about.image}
            onChange={(url) => setAbout({ ...about, image: url })}
            label="About Section Image"
            aspectRatio="aspect-video"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
          <h3 className="font-semibold text-navy-800 text-base">Team Members</h3>
          <button
            type="button"
            onClick={addMember}
            className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold px-3 py-1.5 rounded transition-colors flex items-center gap-1"
          >
            <FaPlus size={10} /> Add Member
          </button>
        </div>
        <div className="space-y-4">
          {team.map((member) => (
            <div key={member.id} className="bg-gray-50 rounded p-4 border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div className="space-y-3 md:col-span-2">
                <div>
                  <label className="label text-xs">Name</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateMember(member.id, "name", e.target.value)}
                    className="input-field text-sm"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="label text-xs">Role / Position</label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => updateMember(member.id, "role", e.target.value)}
                    className="input-field text-sm"
                    placeholder="CEO, Engineer..."
                  />
                </div>
              </div>
              <div>
                <ImageUploader
                  value={member.image}
                  onChange={(url) => updateMember(member.id, "image", url)}
                  label="Photo"
                  aspectRatio="aspect-square max-w-[120px]"
                />
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  className="mt-2 text-red-400 hover:text-red-600 text-xs flex items-center gap-1"
                >
                  <FaTrash size={10} /> Remove
                </button>
              </div>
            </div>
          ))}
          {team.length === 0 && (
            <p className="text-gray-400 text-sm italic">No team members added yet.</p>
          )}
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
