"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import type { SiteConfig } from "@/types/config";

interface ProjectsGalleryProps {
  config: SiteConfig;
  limit?: number;
  showFilter?: boolean;
  showMore?: boolean;
}

export default function ProjectsGallery({
  config,
  limit,
  showFilter = false,
  showMore = true,
}: ProjectsGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(config.projects.map((p) => p.category)))];

  const filtered =
    activeFilter === "All"
      ? config.projects
      : config.projects.filter((p) => p.category === activeFilter);

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="py-20 concrete-bg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-subtitle">Our Portfolio</p>
          <h2 className="section-title accent-line-center">Featured Projects</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed mt-4">
            A showcase of our finest work across Uganda — from Kampala to the regions.
          </p>
        </div>

        {/* Filters */}
        {showFilter && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 text-sm font-semibold rounded-sm transition-all ${
                  activeFilter === cat
                    ? "bg-navy-800 text-white"
                    : "bg-white text-gray-600 hover:bg-navy-100 hover:text-navy-800 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project) => (
            <div
              key={project.id}
              className="group card cursor-pointer"
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="relative h-56 img-zoom-wrap">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                      <FaSearch size={18} className="text-white" />
                    </div>
                  </div>
                </div>
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-bold text-navy-800 text-base">
                    {project.title}
                  </h3>
                  <span className="text-gray-400 text-xs">{project.year}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* More button */}
        {showMore && (
          <div className="text-center mt-10">
            <Link href="/projects" className="btn-primary">
              View All Projects <FaArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Lightbox */}
        {selectedProject && (() => {
          const p = config.projects.find((pr) => pr.id === selectedProject)!;
          return (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <div
                className="bg-white rounded-sm max-w-2xl w-full overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-72">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                      {p.category}
                    </span>
                    <span className="text-gray-400 text-sm">{p.year}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy-800 text-xl mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.description}</p>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="mt-5 text-sm text-gray-400 hover:text-gray-600 underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
