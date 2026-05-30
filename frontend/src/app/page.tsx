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

async function loadData() {
  try {
    const [stats, services, portfolio, packages, process, testimonials, gallery] =
      await Promise.all([
        api.getStats(),
        api.getServices(),
        api.getPortfolio(),
        api.getPackages(),
        api.getProcess(),
        api.getTestimonials(),
        api.getGallery(),
      ]);
    return { stats, services, portfolio, packages, process, testimonials, gallery };
  } catch {
    return {
      stats: fallbackStats,
      services: fallbackServices,
      portfolio: fallbackPortfolio,
      packages: fallbackPackages,
      process: fallbackProcess,
      testimonials: fallbackTestimonials,
      gallery: fallbackGallery,
    };
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
