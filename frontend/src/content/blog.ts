export type BlogContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  snippet: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
  content: BlogContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-smaj-connects-pi-projects",
    title: "How SMAJ PI HUB Connects Multiple Pi Projects in One Experience",
    snippet: "Discover the wallet-connected flow that helps users access services from one trusted hub.",
    author: "SMAJ Team",
    date: "2026-01-18",
    readTime: "8 min read",
    category: "Platform",
    tags: ["Ecosystem", "Platform", "Guides"],
    featured: true,
    content: [
      { type: "heading", text: "Why an All-in-One Pi Hub Matters" },
      {
        type: "paragraph",
        text: "Many users face a fragmented journey when each service lives in a separate system with different onboarding rules. SMAJ PI HUB solves this by introducing a single front door where users can understand the ecosystem quickly and then access the exact service they need.",
      },
      {
        type: "paragraph",
        text: "This structure improves trust, lowers confusion, and supports faster adoption of real Pi utility because the same identity flow, service language, and support standards are reused across modules.",
      },
      { type: "heading", text: "Cross-Platform Access Flow" },
      {
        type: "steps",
        items: [
          "Connect Pi wallet from the main header.",
          "Select a module like Store, Marketplace, or Digital Services.",
          "Continue with a shared identity and trust profile.",
          "Confirm Pi transaction and track delivery or milestone status.",
        ],
      },
      { type: "quote", text: "One ecosystem, one wallet touchpoint, many real-world Pi use cases." },
    ],
  },
  {
    slug: "building-trusted-pi-commerce",
    title: "Building Trusted Pi Commerce Through Verified Sellers and Escrow Flow",
    snippet: "How SMAJ marketplace creates transparent ordering and delivery through Pi wallet flow and evolving token utility.",
    author: "Marketplace Ops",
    date: "2026-01-10",
    readTime: "6 min read",
    category: "Marketplace",
    tags: ["Marketplace", "Security"],
    content: [
      { type: "heading", text: "Trust by Design" },
      {
        type: "paragraph",
        text: "A healthy marketplace depends on reliable identity checks, clear merchant profiles, and strong dispute handling. SMAJ PI HUB includes these controls as default layers for every listing.",
      },
      { type: "heading", text: "Escrow-Based Purchase Journey" },
      {
        type: "paragraph",
        text: "Escrow reduces payment risk by protecting both buyer and seller until the order reaches a verified completion state.",
      },
    ],
  },
  {
    slug: "connect-wallet-once-access-more-services",
    title: "Connect Your Wallet Once and Access Multiple Services Across the Hub",
    snippet: "A simple workflow to move from browsing to ordering, delivery, and support.",
    author: "Product Team",
    date: "2026-01-06",
    readTime: "5 min read",
    category: "Guides",
    tags: ["Guides", "Platform"],
    content: [
      { type: "heading", text: "Single Sign-In Experience" },
      {
        type: "paragraph",
        text: "Wallet-first onboarding creates one reliable account path across modules, reducing friction and repeated setup steps.",
      },
    ],
  },
];

export const featuredBlogPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];
