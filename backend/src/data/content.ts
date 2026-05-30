export const stats = [
  { id: "views", label: "Content Views", value: 2000000, suffix: "+", display: "2M+" },
  { id: "reach", label: "Reach Generated", value: 500000, suffix: "+", display: "500K+" },
  { id: "campaigns", label: "Campaigns Delivered", value: 100, suffix: "+", display: "100+" },
  { id: "brands", label: "Brands Assisted", value: 50, suffix: "+", display: "50+" },
];

export const services = [
  {
    id: "01",
    title: "Social Media Management",
    description:
      "Strategic content calendars, community engagement, and platform-native storytelling that keeps your brand top of mind.",
    tags: ["Instagram", "Meta", "Analytics"],
  },
  {
    id: "02",
    title: "Content Creation",
    description:
      "Photography, reels, and graphic design crafted with editorial precision for cafes, restaurants, and lifestyle brands.",
    tags: ["Reels", "Photography", "Design"],
  },
  {
    id: "03",
    title: "SEO & Google Growth",
    description:
      "Local SEO, Google Business optimization, and review strategies that turn searches into foot traffic.",
    tags: ["Local SEO", "GBP", "Reviews"],
  },
  {
    id: "04",
    title: "Paid Advertising",
    description:
      "Performance-driven Meta campaigns with creative testing, audience refinement, and measurable ROI.",
    tags: ["Meta Ads", "Retargeting", "ROAS"],
  },
];

export const portfolio = [
  {
    id: "1",
    brand: "Cozy Café Campaign",
    industry: "Coffee Shop",
    services: ["Content Creation", "Reels", "Social Media"],
    results: "340% increase in Instagram engagement · 2.1M reel views in 90 days",
    image: "/media/photos/cafe-01.png",
    layout: "left" as const,
    type: "image" as const,
  },
  {
    id: "2",
    brand: "Minimalist Brand Story",
    industry: "Café & Lifestyle",
    services: ["Photography", "Graphic Design", "Paid Ads"],
    results: "180% more profile actions · Stronger brand recognition across feeds",
    image: "/media/photos/cafe-03.png",
    layout: "right" as const,
    type: "image" as const,
  },
  {
    id: "3",
    brand: "Reels Production",
    industry: "Local Business",
    services: ["Video Production", "Reels Editing", "Social Media"],
    results: "Launch campaign reached 890K in first month · High-retention short-form content",
    image: "/media/photos/cafe-04.png",
    video: "/media/videos/reel-05.mp4",
    layout: "full" as const,
    type: "video" as const,
  },
];

export const packages = [
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
      "Alternate Day Stories",
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

export const process = [
  {
    step: "01",
    title: "Strategy",
    description: "Brand audit, audience mapping, and a content roadmap built for your market.",
  },
  {
    step: "02",
    title: "Create",
    description: "Editorial shoots, reels, and design systems that feel unmistakably yours.",
  },
  {
    step: "03",
    title: "Launch",
    description: "Scheduled publishing, ads go-live, and SEO foundations in place.",
  },
  {
    step: "04",
    title: "Scale",
    description: "Analytics-driven iteration to compound reach, engagement, and revenue.",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Owner, Brew & Bloom Café",
    quote:
      "Crafthouse transformed our Instagram from quiet to buzzing. The reels alone brought in customers we'd never reached before.",
    video: null,
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "Chef & Partner, Ember Kitchen",
    quote:
      "Professional, cinematic, and deeply strategic. Our reservations through Google doubled within four months.",
    video: null,
  },
  {
    id: "3",
    name: "Ananya Reddy",
    role: "Founder, District Lifestyle Co.",
    quote:
      "They don't feel like an agency — they feel like an extension of our brand team. Every deliverable is magazine-quality.",
    video: null,
  },
];

export const gallery = {
  graphicDesign: [
    { id: "g1", title: "Coffee Time Post", image: "/media/photos/graphic-01.jpg" },
    { id: "g2", title: "Cozy Café Post", image: "/media/photos/graphic-02.jpg" },
    { id: "g3", title: "Café Opening Story", image: "/media/photos/graphic-03.jpg" },
    { id: "g4", title: "Brand Visual", image: "/media/photos/brand-01.png" },
    { id: "g5", title: "Café Editorial", image: "/media/photos/cafe-01.png" },
    { id: "g6", title: "Social Creative", image: "/media/photos/cafe-04.png" },
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
    { id: "w4", title: "Opening Campaign", preview: "/media/photos/graphic-03.jpg", image: "/media/photos/graphic-03.jpg" },
  ],
};
