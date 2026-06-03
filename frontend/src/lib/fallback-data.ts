import type {
  GalleryData,
  Package,
  PortfolioItem,
  ProcessStep,
  Service,
  Stat,
  Testimonial,
} from "./api";

export const fallbackStats: Stat[] = [
  { id: "views", label: "Content Views", value: 2000000, suffix: "+", display: "2M+" },
  { id: "reach", label: "Reach Generated", value: 500000, suffix: "+", display: "500K+" },
  { id: "brands", label: "Brands Assisted", value: 50, suffix: "+", display: "50+" },
];

export const fallbackServices: Service[] = [
  {
    id: "01",
    title: "Social Media Management",
    description:
      "Strategic content calendars, community engagement, and platform-native storytelling.",
    tags: ["Instagram", "Meta", "Analytics"],
  },
  {
    id: "02",
    title: "Content Creation",
    description: "Photography, reels, and graphic design with editorial precision.",
    tags: ["Reels", "Photography", "Design"],
  },
  {
    id: "03",
    title: "SEO & Google Growth",
    description: "Local SEO, Google Business optimization, and review strategies.",
    tags: ["Local SEO", "GBP", "Reviews"],
  },
  {
    id: "04",
    title: "Paid Advertising",
    description: "Performance-driven Meta campaigns with measurable ROI.",
    tags: ["Meta Ads", "Retargeting", "ROAS"],
  },
];

export const fallbackPortfolio: PortfolioItem[] = [
  {
    id: "1",
    brand: "Cozy Café Campaign",
    industry: "Coffee Shop",
    services: ["Content Creation", "Reels", "Social Media"],
    results: "340% increase in Instagram engagement",
    image: "/media/photos/cafe-01.png",
    layout: "left",
    type: "image",
  },
  {
    id: "2",
    brand: "Minimalist Brand Story",
    industry: "Café & Lifestyle",
    services: ["Photography", "Graphic Design", "Paid Ads"],
    results: "180% more profile actions",
    image: "/media/photos/cafe-03.png",
    layout: "right",
    type: "image",
  },
  {
    id: "3",
    brand: "Reels Production",
    industry: "Local Business",
    services: ["Video Production", "Reels Editing"],
    results: "500K+ reach in first month",
    image: "/media/photos/cafe-04.png",
    video: "/media/videos/reel-05.mp4",
    layout: "full",
    type: "video",
  },
];

export const fallbackPackages: Package[] = [
  {
    id: "starter",
    name: "Starter Package",
    price: 24999,
    currency: "₹",
    period: "/ month",
    features: [
      "6 Posts",
      "10 Reels",
      "Story Posting",
      "Captions",
      "Graphic Design",
      "Basic Page Management",
      "Google Business Optimization",
      "Basic Meta Ads",
    ],
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth Package",
    price: 34999,
    currency: "₹",
    period: "/ month",
    badge: "Best Value",
    features: [
      "10 Posts",
      "15 Reels",
      "Story Posting",
      "Editing",
      "Posting",
      "Analytics Reports",
      "Google SEO",
      "Review Strategy",
      "Meta Ads Management",
    ],
    highlighted: true,
  },
];

export const fallbackProcess: ProcessStep[] = [
  { step: "01", title: "Strategy", description: "Brand audit and content roadmap." },
  { step: "02", title: "Create", description: "Editorial shoots and design systems." },
  { step: "03", title: "Launch", description: "Publishing, ads, and SEO foundations." },
  { step: "04", title: "Scale", description: "Analytics-driven growth iteration." },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Owner, Mood & Mocha Café",
    quote: "Crafthouse transformed our Instagram from quiet to buzzing.",
    video: null,
  },
  {
    id: "2",
    name: "Anand Dodia",
    role: "Chef, Five Elements",
    quote: "Professional, cinematic, and deeply strategic.",
    video: null,
  },
];

export const fallbackGallery: GalleryData = {
  graphicDesign: [
    { id: "g1", title: "Coffee Time Post", image: "/media/photos/graphic-01.jpg" },
    { id: "g2", title: "Cozy Café Post", image: "/media/photos/graphic-02.jpg" },
    { id: "g3", title: "Café Opening Story", image: "/media/photos/graphic-03.jpg" },
    { id: "g4", title: "Brand Visual", image: "/media/photos/brand-01.png" },
  ],
  reels: [
    { id: "r1", title: "Reel 01", image: "/media/photos/cafe-02.jpg", video: "/media/videos/reel-01.mp4" },
    { id: "r2", title: "Reel 02", image: "/media/photos/cafe-02.jpg", video: "/media/videos/reel-02.mp4" },
    { id: "r3", title: "Reel 03", image: "/media/photos/cafe-03.png", video: "/media/videos/reel-03.mp4" },
    { id: "r4", title: "Reel 04", image: "/media/photos/cafe-04.png", video: "/media/videos/reel-04.mp4" },
    { id: "r5", title: "Reel 05", image: "/media/photos/cafe-01.png", video: "/media/videos/reel-05.mp4" },
  ],
  websites: [
    { id: "w1", title: "Café Brand", preview: "/media/photos/cafe-02.jpg", image: "/media/photos/cafe-02.jpg" },
    { id: "w2", title: "Coffee Shop", preview: "/media/photos/cafe-03.png", image: "/media/photos/cafe-03.png" },
    { id: "w3", title: "Brand Identity", preview: "/media/photos/brand-01.png", image: "/media/photos/brand-01.png" },
  ],
};
