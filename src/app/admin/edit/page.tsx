"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaHardHat, FaArrowLeft, FaSignOutAlt, FaEye,
  FaBuilding, FaImages, FaTools, FaPhone, FaEdit,
  FaHome, FaSpinner,
} from "react-icons/fa";
import GeneralEditor from "@/components/admin/GeneralEditor";
import HeroEditor from "@/components/admin/HeroEditor";
import ServicesEditor from "@/components/admin/ServicesEditor";
import AboutEditor from "@/components/admin/AboutEditor";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import ContactEditor from "@/components/admin/ContactEditor";
import FooterEditor from "@/components/admin/FooterEditor";
import type { SiteConfig } from "@/types/config";

const SECTIONS = [
  { id: "general", label: "General", icon: FaBuilding, desc: "Name, logo, tagline, favicon" },
  { id: "hero", label: "Hero", icon: FaHome, desc: "Headline, subtitle, background" },
  { id: "services", label: "Services", icon: FaTools, desc: "Add/edit/remove services" },
  { id: "about", label: "About", icon: FaEdit, desc: "Story, mission, team" },
  { id: "projects", label: "Projects", icon: FaImages, desc: "Portfolio gallery" },
  { id: "contact", label: "Contact", icon: FaPhone, desc: "Contact info & social" },
  { id: "footer", label: "Footer", icon: FaEdit, desc: "Copyright, hours" },
];

function EditPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section") || "general";

  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loadError, setLoadError] = useState("");
  const [activeSection, setActiveSection] = useState(sectionParam);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then(setConfig)
      .catch(() => setLoadError("Failed to load site configuration"));
  }, []);

  useEffect(() => {
    setActiveSection(sectionParam);
  }, [sectionParam]);

  const handleSectionChange = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    router.replace(`/admin/edit?section=${id}`, { scroll: false });
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{loadError}</p>
          <button onClick={() => window.location.reload()} className="text-navy-700 underline text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const activeInfo = SECTIONS.find((s) => s.id === activeSection);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top header */}
      <header className="bg-navy-800 text-white px-4 md:px-6 py-3.5 flex items-center justify-between shadow-lg flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-gray-400 hover:text-white transition-colors p-1 -ml-1">
            <FaArrowLeft size={15} />
          </Link>
          <div className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center">
            <FaHardHat size={16} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="font-heading font-bold text-sm text-white">Site Editor</div>
            <div className="text-gray-400 text-xs">{config?.company_name || "Loading..."}</div>
          </div>
          {/* Mobile section toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden flex items-center gap-2 text-gray-300 text-xs border border-navy-600 px-2 py-1 rounded"
          >
            <FaEdit size={12} />
            {activeInfo?.label}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="text-gray-400 hover:text-white text-xs flex items-center gap-1.5 transition-colors">
            <FaEye size={13} /> <span className="hidden sm:inline">View Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 text-xs flex items-center gap-1.5 transition-colors"
          >
            <FaSignOutAlt size={13} /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            mobileOpen ? "flex" : "hidden"
          } sm:flex flex-col w-56 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto z-10`}
          style={{ position: mobileOpen ? "fixed" : "relative", top: mobileOpen ? "52px" : "auto", bottom: 0, left: 0 }}
        >
          <nav className="p-3 space-y-1">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`admin-sidebar-link w-full text-left ${
                    activeSection === section.id ? "active" : ""
                  }`}
                >
                  <Icon size={15} className="flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{section.label}</div>
                    <div className="text-xs opacity-70 truncate">{section.desc}</div>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto p-3 border-t border-gray-200">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-navy-700 transition-colors py-2 px-3 rounded"
            >
              <FaEye size={12} /> Preview Website
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {!config ? (
            <div className="flex items-center justify-center h-full py-20">
              <div className="text-center">
                <FaSpinner size={28} className="animate-spin text-navy-700 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Loading configuration...</p>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
              {/* Section title */}
              <div className="mb-6">
                <h1 className="font-heading font-bold text-navy-800 text-xl">
                  {activeInfo?.label}
                </h1>
                <p className="text-gray-500 text-sm mt-1">{activeInfo?.desc}</p>
              </div>

              {/* Editor */}
              <div className="bg-white rounded-sm border border-gray-200 p-6 shadow-sm">
                {activeSection === "general" && (
                  <GeneralEditor config={config} onSaved={setConfig} />
                )}
                {activeSection === "hero" && (
                  <HeroEditor config={config} onSaved={setConfig} />
                )}
                {activeSection === "services" && (
                  <ServicesEditor config={config} onSaved={setConfig} />
                )}
                {activeSection === "about" && (
                  <AboutEditor config={config} onSaved={setConfig} />
                )}
                {activeSection === "projects" && (
                  <ProjectsEditor config={config} onSaved={setConfig} />
                )}
                {activeSection === "contact" && (
                  <ContactEditor config={config} onSaved={setConfig} />
                )}
                {activeSection === "footer" && (
                  <FooterEditor config={config} onSaved={setConfig} />
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function EditPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner size={28} className="animate-spin text-navy-700" />
      </div>
    }>
      <EditPageContent />
    </Suspense>
  );
}
