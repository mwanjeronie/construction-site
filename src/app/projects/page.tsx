export const dynamic = "force-dynamic";
import { getSiteConfig } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectsGallery from "@/components/ProjectsGallery";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function ProjectsPage() {
  const config = await getSiteConfig();

  return (
    <>
      <Header config={config} />
      <main>
        {/* Page Hero */}
        <section className="page-hero bg-navy-800">
          <div className="max-w-7xl mx-auto px-4 pt-20">
            <p className="section-subtitle text-amber-400 mb-2">Our Work</p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-4">
              Featured Projects
            </h1>
            <p className="text-gray-300 max-w-xl">
              Explore our portfolio of completed projects across residential, commercial, and infrastructure sectors.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-amber-400">Projects</span>
            </div>
          </div>
        </section>

        {/* Gallery with filter */}
        <ProjectsGallery config={config} showFilter showMore={false} />

        {/* Stats */}
        <section className="py-16 bg-navy-800">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {config.stats.map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-black font-heading text-amber-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-navy-800 mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-gray-500 mb-8 text-base">
              Let us add your project to our growing portfolio of excellence.
            </p>
            <Link href="/contact" className="btn-primary">
              Start Your Project <FaArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>
      <Footer config={config} />
    </>
  );
}
