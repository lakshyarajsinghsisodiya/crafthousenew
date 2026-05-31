import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Results } from "@/components/sections/Results";
import { Gallery } from "@/components/sections/Gallery";
import { Packages } from "@/components/sections/Packages";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { api } from "@/lib/api";
import {
  fallbackGallery,
  fallbackPackages,
  fallbackPortfolio,
  fallbackProcess,
  fallbackServices,
  fallbackStats,
  fallbackTestimonials,
} from "@/lib/fallback-data";

const fallbackContent = {
  stats: fallbackStats,
  services: fallbackServices,
  portfolio: fallbackPortfolio,
  packages: fallbackPackages,
  process: fallbackProcess,
  testimonials: fallbackTestimonials,
  gallery: fallbackGallery,
};

async function loadData() {
  if (process.env.NODE_ENV === "development") {
    return fallbackContent;
  }

  try {
    return await api.getContent();
  } catch {
    return fallbackContent;
  }
}

export default async function Home() {
  const data = await loadData();

  return (
    <>
      <Hero />
      <About />
      <Services services={data.services} />
      <Portfolio items={data.portfolio} />
      <Results stats={data.stats} />
      <Gallery gallery={data.gallery} />
      <Packages packages={data.packages} />
      <Process steps={data.process} />
      <Testimonials testimonials={data.testimonials} />
      <CTA />
      <Footer />
    </>
  );
}
