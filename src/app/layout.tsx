import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { getSiteConfig } from "@/lib/config";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  let config;
  try {
    config = getSiteConfig();
  } catch {
    config = null;
  }

  return {
    title: config
      ? `${config.company_name} — ${config.tagline}`
      : "Uganda Construction Company",
    description: config?.tagline || "Professional construction services in Uganda",
    icons: {
      icon: config?.favicon_url || "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
