"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaPhone } from "react-icons/fa";
import type { SiteConfig } from "@/types/config";

interface HeaderProps {
  config: SiteConfig;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ config }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-navy-800 shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div className="hidden md:block bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-navy-800 text-xs font-semibold">
          <span>{config.contact.address}</span>
          <div className="flex items-center gap-4">
            <a href={`tel:${config.contact.phone}`} className="flex items-center gap-1 hover:underline">
              <FaPhone size={10} />
              {config.contact.phone}
            </a>
            <span>|</span>
            <a href={`mailto:${config.contact.email}`} className="hover:underline">
              {config.contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {config.logo_url && !config.logo_url.includes("logo.png") ? (
            <div className="relative w-10 h-10">
              <Image
                src={config.logo_url}
                alt={config.company_name}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-10 h-10 bg-amber-500 rounded-sm flex items-center justify-center">
              <span className="text-white font-black text-lg font-heading">
                {config.company_name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <div className="text-white font-black text-lg font-heading leading-tight">
              {config.company_name.split(" ").slice(0, 2).join(" ")}
            </div>
            {config.company_name.split(" ").length > 2 && (
              <div className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
                {config.company_name.split(" ").slice(2).join(" ")}
              </div>
            )}
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${
                pathname === link.href ? "text-amber-400 active" : "text-gray-200"
              } hover:text-amber-400`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-xs py-2 px-5 ml-2">
            Get a Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-900 border-t border-navy-700">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-3 px-3 font-semibold text-sm uppercase tracking-wider rounded transition-colors ${
                  pathname === link.href
                    ? "text-amber-400 bg-navy-800"
                    : "text-gray-300 hover:text-amber-400 hover:bg-navy-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary mt-3 justify-center">
              Get a Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
