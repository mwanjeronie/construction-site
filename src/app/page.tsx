export const dynamic = "force-dynamic";
import { getSiteConfig } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import ProjectsGallery from "@/components/ProjectsGallery";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaBullseye, FaEye, FaHandshake } from "react-icons/fa";

export default async function HomePage() {
  const config = await getSiteConfig();

  return (
    <>
      <Header config={config} />
      <main>
        {/* Hero */}
        <Hero config={config} />

        {/* Services */}
        <ServicesGrid config={config} limit={4} showMore />

        {/* About teaser */}
        <section className="py-20 bg-navy-800 text-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <p className="section-subtitle text-amber-400">Who We Are</p>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-5 accent-line">
                {config.about.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6 text-base">
                {config.about.content.slice(0, 400)}...
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center border border-navy-600 rounded-sm p-4">
                  <div className="text-2xl font-black font-heading text-amber-400">{config.about.founded}</div>
                  <div className="text-gray-400 text-xs mt-1">Founded</div>
                </div>
                <div className="text-center border border-navy-600 rounded-sm p-4">
                  <div className="text-2xl font-black font-heading text-amber-400">{config.about.employees}</div>
                  <div className="text-gray-400 text-xs mt-1">Staff</div>
                </div>
                <div className="text-center border border-navy-600 rounded-sm p-4">
                  <div className="text-2xl font-black font-heading text-amber-400">{config.stats[0].value}</div>
                  <div className="text-gray-400 text-xs mt-1">Projects</div>
                </div>
              </div>
              <Link href="/about" className="btn-primary">
                Learn More <FaArrowRight size={14} />
              </Link>
            </div>

            {/* Image + values */}
            <div className="space-y-4">
              <div className="relative h-64 rounded-sm overflow-hidden">
                <Image
                  src={config.about.image}
                  alt="About us"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { icon: FaBullseye, label: "Mission", text: config.about.mission.slice(0, 80) + "..." },
                  { icon: FaEye, label: "Vision", text: config.about.vision.slice(0, 80) + "..." },
                  { icon: FaHandshake, label: "Values", text: "Integrity, quality, and community in every project." },
                ].map(({ icon: Icon, label, text }) => (
                  <div key={label} className="bg-navy-700/50 rounded-sm p-4 border border-navy-600">
                    <Icon className="text-amber-400 mb-2" size={18} />
                    <div className="font-semibold text-white text-sm mb-1">{label}</div>
                    <p className="text-gray-400 text-xs leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <ProjectsGallery config={config} limit={3} showMore />

        {/* CTA Banner */}
        <section className="relative py-20 bg-amber-500 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 40px)"
            }} />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-heading font-black text-3xl md:text-4xl text-navy-900 mb-4">
              Ready to Build Your Dream Project?
            </h2>
            <p className="text-navy-800 text-lg mb-8 opacity-90">
              Get a free, no-obligation quote from Uganda&apos;s trusted construction experts.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-navy-800 hover:bg-navy-900 text-white font-semibold px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2 uppercase tracking-wider text-sm"
              >
                Get Free Quote <FaArrowRight size={14} />
              </Link>
              <a
                href={`tel:${config.contact.phone}`}
                className="border-2 border-navy-800 text-navy-900 hover:bg-navy-800 hover:text-white font-semibold px-8 py-3 rounded-sm transition-all inline-flex items-center gap-2 uppercase tracking-wider text-sm"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <ContactSection config={config} />
      </main>
      <Footer config={config} />
    </>
  );
}
