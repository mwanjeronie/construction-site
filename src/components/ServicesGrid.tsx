import Link from "next/link";
import Image from "next/image";
import {
  FaHome, FaBuilding, FaRoad, FaTools, FaHardHat, FaWrench,
  FaCog, FaIndustry, FaCity, FaPaintRoller, FaLeaf,
  FaArrowRight,
} from "react-icons/fa";
import type { SiteConfig } from "@/types/config";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FaHome,
  FaBuilding,
  FaRoad,
  FaTools,
  FaHardHat,
  FaWrench,
  FaCog,
  FaIndustry,
  FaCity,
  FaPaintRoller,
  FaLeaf,
};

interface ServicesGridProps {
  config: SiteConfig;
  limit?: number;
  showMore?: boolean;
}

export default function ServicesGrid({ config, limit, showMore = true }: ServicesGridProps) {
  const services = limit ? config.services.slice(0, limit) : config.services;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-subtitle">What We Do</p>
          <h2 className="section-title accent-line-center">Our Core Services</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed mt-4">
            From groundbreaking to handover, we deliver comprehensive construction solutions
            tailored to Uganda&apos;s unique needs and environment.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || FaBuilding;
            return (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                {service.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-navy-900/50 group-hover:bg-navy-900/30 transition-colors" />
                  </div>
                )}

                {/* Content */}
                <div className="bg-white p-6">
                  <div className="w-12 h-12 bg-navy-800 group-hover:bg-amber-500 rounded-sm flex items-center justify-center mb-4 transition-colors duration-300 -mt-10 relative z-10 shadow-lg">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-navy-800 text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href="/services"
                      className="text-navy-700 hover:text-amber-600 text-sm font-semibold flex items-center gap-2 transition-colors"
                    >
                      Learn More <FaArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* More link */}
        {showMore && config.services.length > (limit ?? 0) && (
          <div className="text-center mt-10">
            <Link href="/services" className="btn-primary">
              View All Services <FaArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
