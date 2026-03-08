export const dynamic = "force-dynamic";
import { getSiteConfig } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaBullseye, FaEye, FaHandshake, FaArrowRight, FaUsers, FaAward, FaMapMarkerAlt } from "react-icons/fa";

export default async function AboutPage() {
  const config = await getSiteConfig();
  const { about } = config;

  return (
    <>
      <Header config={config} />
      <main>
        {/* Page Hero */}
        <section className="page-hero" style={{ backgroundImage: `url(${about.image})` }}>
          <div className="max-w-7xl mx-auto px-4 pt-20">
            <p className="section-subtitle text-amber-400 mb-2">Our Story</p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-4">
              About Us
            </h1>
            <p className="text-gray-300 max-w-xl">
              {about.subtitle}
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-amber-400">About</span>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="relative h-96 rounded-sm overflow-hidden shadow-xl">
                <Image
                  src={about.image}
                  alt={about.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 bg-amber-500 text-white rounded-sm p-6 shadow-xl">
                <div className="font-black text-4xl font-heading">{about.founded}</div>
                <div className="text-sm font-semibold">Founded</div>
              </div>
            </div>

            <div>
              <p className="section-subtitle">Our Story</p>
              <h2 className="section-title accent-line">{about.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{about.content}</p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                {config.stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-black font-heading text-amber-500">{stat.value}</div>
                    <div className="text-gray-500 text-xs mt-1 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 concrete-bg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="section-subtitle">What Drives Us</p>
              <h2 className="section-title accent-line-center">Our Core Principles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: FaBullseye,
                  title: "Our Mission",
                  text: about.mission,
                  color: "bg-navy-800",
                },
                {
                  icon: FaEye,
                  title: "Our Vision",
                  text: about.vision,
                  color: "bg-amber-500",
                },
                {
                  icon: FaHandshake,
                  title: "Our Values",
                  text: "We build on a foundation of integrity, innovation, and respect — for our clients, our community, and our environment.",
                  color: "bg-navy-600",
                },
              ].map(({ icon: Icon, title, text, color }) => (
                <div key={title} className="bg-white rounded-sm shadow-md overflow-hidden">
                  <div className={`${color} p-6`}>
                    <Icon size={32} className="text-white mb-3" />
                    <h3 className="font-heading font-bold text-white text-xl">{title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed text-sm">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-navy-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="section-subtitle text-amber-400">Why BuildRight?</p>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-4 accent-line-center">
                Why Choose Us
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: FaAward, title: "Certified Excellence", desc: "ISO-certified processes and internationally trained engineers ensuring top quality." },
                { icon: FaUsers, title: "Expert Team", desc: `Over ${about.employees} skilled professionals dedicated to your project success.` },
                { icon: FaMapMarkerAlt, title: "Uganda-Wide Coverage", desc: "We operate across all regions of Uganda, from Kampala to rural areas." },
                { icon: FaHandshake, title: "Client-First Approach", desc: "We work closely with every client from design to delivery, ensuring satisfaction." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center bg-navy-700/40 border border-navy-600 rounded-sm p-6">
                  <div className="w-14 h-14 bg-amber-500 rounded-sm flex items-center justify-center mx-auto mb-4">
                    <Icon size={26} className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-base mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        {config.team && config.team.length > 0 && config.team.some(m => m.name) && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-14">
                <p className="section-subtitle">The People Behind</p>
                <h2 className="section-title accent-line-center">Our Leadership Team</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {config.team.map((member) => (
                  <div key={member.id} className="text-center group">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-amber-500 shadow-lg">
                      {member.image ? (
                        <Image src={member.image} alt={member.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-navy-800 flex items-center justify-center">
                          <span className="text-3xl font-black text-white font-heading">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-navy-800 text-lg">{member.name}</h3>
                    <p className="text-amber-600 text-sm font-semibold">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-concrete-100 border-t border-concrete-200">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-navy-800 mb-4">
              Ready to Work With Us?
            </h2>
            <p className="text-gray-500 mb-8">
              Let&apos;s discuss your project and bring your vision to life.
            </p>
            <Link href="/contact" className="btn-primary">
              Get in Touch <FaArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>
      <Footer config={config} />
    </>
  );
}
