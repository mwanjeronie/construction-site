export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getSiteConfig } from "@/lib/config";
import Link from "next/link";
import {
  FaEdit, FaEye, FaBuilding, FaTools, FaImages, FaPhone,
  FaHardHat, FaArrowRight
} from "react-icons/fa";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin/login");

  const config = await getSiteConfig();

  const stats = [
    { label: "Services", value: config.services.length, icon: FaTools, href: "/admin/edit?section=services" },
    { label: "Projects", value: config.projects.length, icon: FaImages, href: "/admin/edit?section=projects" },
    { label: "Team Members", value: config.team.length, icon: FaBuilding, href: "/admin/edit?section=about" },
    { label: "Contact Info", value: "Set", icon: FaPhone, href: "/admin/edit?section=contact" },
  ];

  const sections = [
    { id: "general", label: "General Settings", desc: "Company name, logo, tagline, favicon", icon: FaBuilding, color: "text-navy-700" },
    { id: "hero", label: "Hero Section", desc: "Main headline, subtitle, CTA, background image", icon: FaImages, color: "text-amber-600" },
    { id: "services", label: "Services", desc: "Add/edit/remove your services", icon: FaTools, color: "text-navy-700" },
    { id: "about", label: "About Us", desc: "Company story, mission, vision, team", icon: FaBuilding, color: "text-amber-600" },
    { id: "projects", label: "Projects Gallery", desc: "Portfolio of your completed projects", icon: FaImages, color: "text-navy-700" },
    { id: "contact", label: "Contact & Social", desc: "Phone, email, address, social links", icon: FaPhone, color: "text-amber-600" },
    { id: "footer", label: "Footer", desc: "Copyright, hours, tagline", icon: FaEdit, color: "text-navy-700" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-navy-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-500 rounded-sm flex items-center justify-center">
            <FaHardHat size={18} className="text-white" />
          </div>
          <div>
            <div className="font-heading font-black text-sm">{config.company_name}</div>
            <div className="text-gray-400 text-xs">Admin Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors"
          >
            <FaEye size={14} /> View Site
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-heading font-black text-2xl text-navy-800 mb-1">
            Welcome back, {session.username}
          </h1>
          <p className="text-gray-500 text-sm">Manage your construction site content from here.</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-white rounded-sm border border-gray-200 p-5 hover:border-navy-400 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon size={20} className="text-navy-700 group-hover:text-amber-600 transition-colors" />
                  <FaArrowRight size={12} className="text-gray-300 group-hover:text-amber-500 transition-colors" />
                </div>
                <div className="text-2xl font-black font-heading text-navy-800">{stat.value}</div>
                <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
              </Link>
            );
          })}
        </div>

        {/* Section links */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading font-bold text-navy-800 text-lg">Edit Sections</h2>
          <Link href="/admin/edit" className="btn-primary py-2 text-xs">
            Open Full Editor <FaArrowRight size={11} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.id}
                href={`/admin/edit?section=${section.id}`}
                className="bg-white border border-gray-200 rounded-sm p-5 flex items-start gap-4 hover:border-navy-400 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-gray-50 group-hover:bg-navy-800 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors border border-gray-200">
                  <Icon size={18} className={`${section.color} group-hover:text-white transition-colors`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-navy-800 text-sm">{section.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5 truncate">{section.desc}</div>
                </div>
                <FaEdit size={14} className="text-gray-300 group-hover:text-amber-500 mt-1 flex-shrink-0 transition-colors" />
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
