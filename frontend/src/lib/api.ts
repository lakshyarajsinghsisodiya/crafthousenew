const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function fetchAPI<T>(path: string, revalidate = 3600): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate },
  });
  if (!res.ok) throw new Error(`API error: ${path}`);
  return res.json() as Promise<T>;
}

export interface SiteContent {
  stats: Stat[];
  services: Service[];
  portfolio: PortfolioItem[];
  packages: Package[];
  process: ProcessStep[];
  testimonials: Testimonial[];
  gallery: GalleryData;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface PortfolioItem {
  id: string;
  brand: string;
  industry: string;
  services: string[];
  results: string;
  image: string;
  video?: string;
  layout: "left" | "right" | "full";
  type: "image" | "video";
}

export interface Package {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  badge?: string;
  features: string[];
  highlighted: boolean;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  display: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  video: string | null;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  video?: string;
  url?: string;
  preview?: string;
}

export interface GalleryData {
  graphicDesign: GalleryItem[];
  reels: GalleryItem[];
  websites: GalleryItem[];
}

export const api = {
  getContent: () => fetchAPI<SiteContent>("/content"),
  getStats: () => fetchAPI<Stat[]>("/stats"),
  getServices: () => fetchAPI<Service[]>("/services"),
  getPortfolio: () => fetchAPI<PortfolioItem[]>("/portfolio"),
  getPackages: () => fetchAPI<Package[]>("/packages"),
  getProcess: () => fetchAPI<ProcessStep[]>("/process"),
  getTestimonials: () => fetchAPI<Testimonial[]>("/testimonials"),
  getGallery: () => fetchAPI<GalleryData>("/gallery"),
  submitContact: async (data: {
    name: string;
    email: string;
    business?: string;
    message: string;
    type: "discovery" | "proposal";
  }) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
