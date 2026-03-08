import { getSiteConfig } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/ServicesGrid";
import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default async function ServicesPage() {
  const config = await getSiteConfig();

  const process = [
    { step: "01", title: "Initial Consultation", desc: "We meet to understand your vision, requirements, and budget." },
    { step: "02", title: "Design & Planning", desc: "Our engineers create detailed plans, drawings, and BOQs." },
    { step: "03", title: "Approval & Contract", desc: "We handle all necessary permits and sign a clear contract." },
    { step: "04", title: "Construction", desc: "Our expert team executes the project with precision and quality." },
    { step: "05", title: "Quality Inspection", desc: "Rigorous quality checks at every stage of construction." },
    { step: "06", title: "Handover", desc: "We hand over your completed project on time, every time." },
  ];

  const whyUs = [
    "Licensed and certified by Uganda National Building Society",
    "Use of locally sourced, premium quality materials",
    "Experienced team of over 200 professionals",
    "On-time project delivery guarantee",
    "Transparent pricing with no hidden costs",
    "Post-completion support and maintenance",
  ];

  return (
    <>
      <Header config={config} />
      <main>
        {/* Page Hero */}
        <section className="page-hero bg-navy-800">
          <div className="max-w-7xl mx-auto px-4 pt-20">
            <p className="section-subtitle text-amber-400 mb-2">What We Offer</p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-4">
              Our Services
            </h1>
            <p className="text-gray-300 max-w-xl">
              Comprehensive construction and engineering services delivered with expertise across Uganda.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-amber-400">Services</span>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <ServicesGrid config={config} showMore={false} />

        {/* Why choose us */}
        <section className="py-20 bg-navy-800 text-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle text-amber-400">Our Commitment</p>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-6 accent-line">
                Why Choose BuildRight?
              </h2>
              <ul className="space-y-3">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FaCheckCircle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy-700/50 border border-navy-600 rounded-sm p-8">
              <h3 className="font-heading font-bold text-white text-xl mb-4">
                Request a Free Quote
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Tell us about your project and we&apos;ll provide a detailed estimate within 48 hours.
              </p>
              <Link href="/contact" className="btn-primary w-full justify-center">
                Get Free Quote <FaArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 concrete-bg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="section-subtitle">How We Work</p>
              <h2 className="section-title accent-line-center">Our Process</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed mt-4">
                A structured, transparent approach that keeps you informed and in control at every step.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {process.map((item) => (
                <div key={item.step} className="bg-white rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow border border-concrete-200">
                  <div className="text-5xl font-black font-heading text-concrete-200 mb-3 leading-none">{item.step}</div>
                  <h3 className="font-heading font-bold text-navy-800 text-base mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer config={config} />
    </>
  );
}
