import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import type { SiteConfig } from "@/types/config";

interface FooterProps {
  config: SiteConfig;
}

export default function Footer({ config }: FooterProps) {
  const services = config.services.slice(0, 4);
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Our Projects" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <footer className="bg-navy-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company info */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-amber-500 rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-lg font-heading">
                {config.company_name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="text-white font-black text-base font-heading leading-tight">
                {config.company_name.split(" ").slice(0, 2).join(" ")}
              </div>
              {config.company_name.split(" ").length > 2 && (
                <div className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
                  {config.company_name.split(" ").slice(2).join(" ")}
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            {config.footer.tagline}
          </p>
          {/* Social */}
          <div className="flex items-center gap-3">
            {config.social_links.facebook && (
              <a
                href={config.social_links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-700 hover:bg-amber-500 rounded-sm flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={15} className="text-white" />
              </a>
            )}
            {config.social_links.twitter && (
              <a
                href={config.social_links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-700 hover:bg-amber-500 rounded-sm flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={15} className="text-white" />
              </a>
            )}
            {config.social_links.linkedin && (
              <a
                href={config.social_links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-700 hover:bg-amber-500 rounded-sm flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={15} className="text-white" />
              </a>
            )}
            {config.social_links.youtube && (
              <a
                href={config.social_links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-700 hover:bg-amber-500 rounded-sm flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={15} className="text-white" />
              </a>
            )}
            {config.contact.whatsapp && (
              <a
                href={`https://wa.me/${config.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-700 hover:bg-green-600 rounded-sm flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={15} className="text-white" />
              </a>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-base font-heading uppercase tracking-wider mb-5 border-b border-navy-700 pb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2"
                >
                  <FaArrowRight size={10} className="text-amber-500" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-bold text-base font-heading uppercase tracking-wider mb-5 border-b border-navy-700 pb-3">
            Our Services
          </h3>
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2"
                >
                  <FaArrowRight size={10} className="text-amber-500" />
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-bold text-base font-heading uppercase tracking-wider mb-5 border-b border-navy-700 pb-3">
            Contact Us
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt size={15} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-400 text-sm">{config.contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone size={13} className="text-amber-500 flex-shrink-0" />
              <a href={`tel:${config.contact.phone}`} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                {config.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope size={13} className="text-amber-500 flex-shrink-0" />
              <a href={`mailto:${config.contact.email}`} className="text-gray-400 hover:text-amber-400 text-sm transition-colors break-all">
                {config.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FaClock size={13} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-400 text-sm">{config.footer.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">{config.footer.copyright}</p>
          <Link
            href="/admin"
            className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
