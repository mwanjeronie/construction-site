"use client";

import { useState } from "react";
import { FaSave, FaSpinner, FaPlus, FaTrash, FaChevronUp, FaChevronDown } from "react-icons/fa";
import ImageUploader from "./ImageUploader";
import type { SiteConfig, ProjectItem } from "@/types/config";

interface Props {
  config: SiteConfig;
  onSaved: (updated: SiteConfig) => void;
}

const newProject = (): ProjectItem => ({
  id: Date.now().toString(),
  title: "New Project",
  image: "",
  description: "",
  category: "Commercial",
  year: new Date().getFullYear().toString(),
});

const CATEGORIES = ["Residential", "Commercial", "Infrastructure", "Education", "Hospitality", "Industrial", "Other"];

export default function ProjectsEditor({ config, onSaved }: Props) {
  const [projects, setProjects] = useState<ProjectItem[]>([...config.projects]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects }),
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

  const update = (id: string, partial: Partial<ProjectItem>) => {
    setProjects(projects.map((p) => p.id === id ? { ...p, ...partial } : p));
  };

  const remove = (id: string) => setProjects(projects.filter((p) => p.id !== id));

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...projects];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setProjects(next);
  };

  const moveDown = (idx: number) => {
    if (idx === projects.length - 1) return;
    const next = [...projects];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    setProjects(next);
  };

  return (
    <div className="space-y-4">
      {projects.map((project, idx) => (
        <div key={project.id} className="border border-gray-200 rounded overflow-hidden">
          <div
            className="flex items-center gap-3 bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setExpanded(expanded === project.id ? null : project.id)}
          >
            <div className="flex flex-col gap-1">
              <button type="button" onClick={(e) => { e.stopPropagation(); moveUp(idx); }} className="text-gray-400 hover:text-navy-700 leading-none">
                <FaChevronUp size={10} />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); moveDown(idx); }} className="text-gray-400 hover:text-navy-700 leading-none">
                <FaChevronDown size={10} />
              </button>
            </div>
            <span className="w-5 h-5 bg-amber-500 text-white text-xs rounded-sm flex items-center justify-center font-bold flex-shrink-0">
              {idx + 1}
            </span>
            <span className="flex-1 font-medium text-sm text-navy-800 truncate">{project.title}</span>
            <span className="text-xs text-gray-400 bg-white border border-gray-200 rounded px-2 py-0.5 hidden sm:block">
              {project.category}
            </span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); remove(project.id); }}
              className="text-red-400 hover:text-red-600 p-1"
              title="Delete"
            >
              <FaTrash size={12} />
            </button>
            <span className="text-gray-400 text-xs">{expanded === project.id ? "▲" : "▼"}</span>
          </div>

          {expanded === project.id && (
            <div className="p-4 space-y-4">
              <div>
                <label className="label">Project Title</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => update(project.id, { title: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea
                  rows={3}
                  value={project.description}
                  onChange={(e) => update(project.id, { description: e.target.value })}
                  className="textarea-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Category</label>
                  <select
                    value={project.category}
                    onChange={(e) => update(project.id, { category: e.target.value })}
                    className="input-field"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Year Completed</label>
                  <input
                    type="text"
                    value={project.year}
                    onChange={(e) => update(project.id, { year: e.target.value })}
                    className="input-field"
                    placeholder="2024"
                  />
                </div>
              </div>
              <ImageUploader
                value={project.image}
                onChange={(image) => update(project.id, { image })}
                label="Project Image"
                aspectRatio="aspect-video"
              />
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => {
          const p = newProject();
          setProjects([...projects, p]);
          setExpanded(p.id);
        }}
        className="flex items-center gap-2 w-full border-2 border-dashed border-gray-300 hover:border-amber-500 text-gray-500 hover:text-amber-700 rounded px-4 py-3 text-sm font-medium transition-colors"
      >
        <FaPlus size={12} /> Add New Project
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
