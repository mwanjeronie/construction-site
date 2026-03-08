export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  map_url: string;
  whatsapp: string;
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  background_image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface AboutConfig {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  mission: string;
  vision: string;
  founded: string;
  employees: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  year: string;
}

export interface FooterConfig {
  copyright: string;
  hours: string;
  tagline: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface SiteConfig {
  company_name: string;
  tagline: string;
  logo_url: string;
  favicon_url: string;
  contact: ContactInfo;
  social_links: SocialLinks;
  hero: HeroConfig;
  services: ServiceItem[];
  about: AboutConfig;
  projects: ProjectItem[];
  footer: FooterConfig;
  stats: StatItem[];
  team: TeamMember[];
}
