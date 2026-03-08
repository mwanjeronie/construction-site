"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaUpload, FaTimes, FaSpinner } from "react-icons/fa";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Upload Image",
  aspectRatio = "aspect-video",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      {label && <label className="label">{label}</label>}

      {/* Preview or Upload zone */}
      <div
        className={`relative ${aspectRatio} bg-gray-50 border-2 border-dashed border-gray-300 rounded overflow-hidden cursor-pointer hover:border-navy-500 transition-colors`}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {value ? (
          <>
            <Image src={value} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center group">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-semibold flex items-center gap-2">
                <FaUpload /> Change Image
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors z-10"
              title="Remove image"
            >
              <FaTimes size={10} />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
            {uploading ? (
              <>
                <FaSpinner size={24} className="animate-spin" />
                <span className="text-sm">Uploading...</span>
              </>
            ) : (
              <>
                <FaUpload size={24} />
                <span className="text-sm font-medium">Click or drag to upload</span>
                <span className="text-xs">JPG, PNG, GIF, WebP (max 10 MB)</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* URL input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Or enter image URL..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field text-xs flex-1"
        />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
