import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaPlay, FaCheckCircle } from "react-icons/fa";
import type { SiteConfig } from "@/types/config";

interface HeroProps {
  config: SiteConfig;
}

export default function Hero({ config }: HeroProps) {
  const { hero, stats } = config;

  return (
    <section className="relative min-h-screen flex items-center text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.background_image}
          alt="Hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-800/80 to-navy-800/60" />
      </div>

      {/* Diagonal accent */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-amber-500/10 skew-x-6 transform origin-bottom-right z-0 hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-sm mb-6">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            Uganda&apos;s Premier Construction Company
          </div>

          {/* Title */}
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            {hero.title.split(" ").map((word, i) =>
              i === 1 || i === 2 ? (
                <span key={i} className="text-amber-400">{word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
            {hero.subtitle}
          </p>

          {/* Feature bullets */}
          <div className="flex flex-wrap gap-4 mb-10">
            {["Licensed & Insured", "On-Time Delivery", "Quality Guaranteed"].map((feat) => (
              <div key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                <FaCheckCircle className="text-amber-500 flex-shrink-0" />
                {feat}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link href={hero.cta_link} className="btn-primary">
              {hero.cta_text}
              <FaArrowRight size={14} />
            </Link>
            <Link href="/projects" className="btn-outline">
              <FaPlay size={12} />
              View Our Work
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-black font-heading text-amber-400">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-400 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-amber-500 to-transparent" />
      </div>
    </section>
  );
}
