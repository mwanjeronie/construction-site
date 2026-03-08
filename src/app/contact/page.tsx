import { getSiteConfig } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";

export default async function ContactPage() {
  const config = await getSiteConfig();

  return (
    <>
      <Header config={config} />
      <main>
        {/* Page Hero */}
        <section className="page-hero bg-navy-800">
          <div className="max-w-7xl mx-auto px-4 pt-20">
            <p className="section-subtitle text-amber-400 mb-2">Reach Out</p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-4">
              Contact Us
            </h1>
            <p className="text-gray-300 max-w-xl">
              We&apos;re here to answer your questions and help bring your construction project to life.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-amber-400">Contact</span>
            </div>
          </div>
        </section>

        {/* Contact form + info with map */}
        <ContactSection config={config} showMap />
      </main>
      <Footer config={config} />
    </>
  );
}
