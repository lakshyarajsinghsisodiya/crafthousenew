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
    // Submit straight to Web3Forms from the browser. Web3Forms is designed for
    // client-side use and the access key is public by design — this avoids
    // Cloudflare blocking server-to-server calls from datacenter IPs (Render).
    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      "f848e9b7-01cb-47fd-b3f2-21392968f38f";
    const typeLabel =
      data.type === "proposal" ? "Proposal request" : "Discovery call";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Crafthouse Media] New ${typeLabel} from ${data.name}`,
          from_name: data.name,
          email: data.email,
          message: [
            `Type: ${typeLabel}`,
            `Business: ${data.business || "—"}`,
            "",
            data.message,
          ].join("\n"),
        }),
      });
      const body = (await res.json()) as { success?: boolean; message?: string };

      if (res.ok && body.success) {
        return {
          success: true,
          message: "Thank you. We'll be in touch within 24 hours.",
        };
      }
      return {
        success: false,
        message:
          body.message || "Could not send your message. Please call or WhatsApp us.",
      };
    } catch {
      return {
        success: false,
        message: "Could not send your message. Please call or WhatsApp us.",
      };
    }
  },
};
