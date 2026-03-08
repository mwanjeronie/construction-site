"use client";

import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaArrowRight } from "react-icons/fa";
import type { SiteConfig } from "@/types/config";

interface ContactSectionProps {
  config: SiteConfig;
  showMap?: boolean;
}

export default function ContactSection({ config, showMap = false }: ContactSectionProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate form submission — wire to a real service in production
    await new Promise((res) => setTimeout(res, 1200));
    setStatus("sent");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="section-subtitle">Get In Touch</p>
          <h2 className="section-title accent-line-center">Contact Us</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed mt-4">
            Ready to start your next project? Get in touch with our expert team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-5">
            <InfoCard
              icon={<FaPhone className="text-amber-500" size={20} />}
              title="Phone"
              lines={[
                <a key="p" href={`tel:${config.contact.phone}`} className="text-gray-500 hover:text-amber-600 text-sm transition-colors">
                  {config.contact.phone}
                </a>,
              ]}
            />
            <InfoCard
              icon={<FaEnvelope className="text-amber-500" size={20} />}
              title="Email"
              lines={[
                <a key="e" href={`mailto:${config.contact.email}`} className="text-gray-500 hover:text-amber-600 text-sm transition-colors">
                  {config.contact.email}
                </a>,
              ]}
            />
            <InfoCard
              icon={<FaMapMarkerAlt className="text-amber-500" size={20} />}
              title="Address"
              lines={[
                <span key="a" className="text-gray-500 text-sm">{config.contact.address}</span>,
              ]}
            />
            <InfoCard
              icon={<FaClock className="text-amber-500" size={20} />}
              title="Working Hours"
              lines={[
                <span key="h" className="text-gray-500 text-sm">{config.footer.hours}</span>,
              ]}
            />
            {config.contact.whatsapp && (
              <a
                href={`https://wa.me/${config.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-sm font-semibold text-sm transition-colors"
              >
                <FaWhatsapp size={20} />
                Chat on WhatsApp
                <FaArrowRight size={12} className="ml-auto" />
              </a>
            )}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 bg-concrete-50 p-8 rounded-sm border border-concrete-200">
            <h3 className="font-heading font-bold text-navy-800 text-xl mb-6">
              Send Us a Message
            </h3>

            {status === "sent" ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-navy-800 text-lg mb-2">Message Sent!</h4>
                <p className="text-gray-500 text-sm">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-amber-600 hover:text-amber-700 text-sm font-semibold underline"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Phone</label>
                    <input
                      type="tel"
                      placeholder="+256 700 000 000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label">Service of Interest</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select a service</option>
                      {config.services.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label">Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="textarea-field"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full justify-center"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                  {status !== "sending" && <FaArrowRight size={14} />}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        {showMap && config.contact.map_url && (
          <div className="mt-12 rounded-sm overflow-hidden shadow-lg border border-gray-200 h-80">
            <iframe
              src={config.contact.map_url}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location map"
            />
          </div>
        )}
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: React.ReactNode[];
}) {
  return (
    <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-sm p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-10 h-10 bg-navy-800/5 rounded-sm flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-semibold text-navy-800 text-sm mb-1">{title}</div>
        {lines}
      </div>
    </div>
  );
}
