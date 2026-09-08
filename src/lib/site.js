/**
 * Single source of truth for every piece of copy on the site.
 * Change the brand name, services, prices or projects here — nothing else.
 */

export const brand = {
  name: "ADS Global",
  fullName: "ADS Global Agency",
  tagline: "Designing meaningful digital experiences that drive real impact.",
  email: "hello@adsglobalagency.com",
  phone: "+1 (555) 019-4477",
  offices: ["Australia", "Canada", "Dubai", "US", "UK"],
  socials: [
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "X", href: "#", icon: "x" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "GitHub", href: "#", icon: "github" },
  ],
};

/**
 * Section anchors tracked by the header. "Contact" is deliberately absent —
 * the enquiry form now lives inside the hero, so a nav entry for it would
 * light up the moment the page loads.
 */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Packages", href: "#packages" },
  { label: "Careers", href: "#careers" },
];

export const hero = {
  eyebrow: "Digital Agency",
  /**
   * Rendered one line per entry. `bold` flips the weight so the headline
   * reads light-then-heavy; `gradient` paints the final line in the accent.
   */
  titleLines: [
    { text: "Let's Build Your" },
    { text: "Digital Legacy.", bold: true, gradient: true },
  ],
  description:
    "Websites, storefronts and brands that earn their keep. Tell us what you're building and we'll come back with a fixed-price plan.",
  secondaryCta: { label: "See our work", href: "#work" },
  trust: [
    "Fixed scope, fixed price",
    "Reply within one business day",
    "You own the code and the files",
  ],
  quickStats: [
    { value: "150+", label: "Projects shipped" },
    { value: "50+", label: "Happy clients" },
    { value: "5+", label: "Years in business" },
  ],
  formTitle: "Get your free proposal",
  formSubtitle: "Two minutes now, a costed plan in your inbox tomorrow.",
};

export const marqueeItems = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Shopify",
  "WordPress",
  "Figma",
  "Tailwind CSS",
  "PostgreSQL",
  "AWS",
  "Framer",
  "Webflow",
];

export const process = {
  eyebrow: "Our Process",
  title: "Three phases,",
  titleHighlight: "one clear line of sight",
  description:
    "No black boxes and no surprise invoices. Each phase ends with something concrete in your hands, and you sign off before the next one starts.",
  steps: [
    {
      number: "01",
      title: "Define",
      icon: "lightbulb",
      duration: "Week 1–2",
      description:
        "We blend raw ideas and hard requirements into one strategic vision, turning loose concepts into solid foundations through concrete, actionable steps.",
      deliverables: ["Discovery workshop", "Technical audit", "Scope & roadmap"],
    },
    {
      number: "02",
      title: "Create",
      icon: "monitor",
      duration: "Week 3–8",
      description:
        "Designers and engineers build in the open — weekly demos, a staging link from day one, and the identity that already makes you different amplified rather than replaced.",
      deliverables: ["UI/UX design", "Development sprints", "Weekly demos"],
    },
    {
      number: "03",
      title: "Deliver",
      icon: "send",
      duration: "Week 9+",
      description:
        "Launch, measure, iterate. Your vision becomes a tangible, high-impact product — and we stay on to make sure it keeps performing after the confetti settles.",
      deliverables: ["QA & launch", "Analytics setup", "Ongoing support"],
    },
  ],
};

export const about = {
  eyebrow: "About us",
  kicker: "Your imagination. Our know-how. One digital force.",
  title: "We create digital excellence",
  paragraphs: [
    "We are a full-service digital firm building custom websites, e-commerce storefronts and scalable web applications for teams who care about the details.",
    "Designers, engineers and growth strategists work as one unit — so SEO, content, branding and performance are decided together, not bolted on at the end.",
  ],
  stats: [
    { value: 150, suffix: "+", label: "Projects completed" },
    { value: 50, suffix: "+", label: "Happy clients" },
    { value: 5, suffix: "+", label: "Years experience" },
    { value: 15, suffix: "+", label: "Team members" },
  ],
  values: [
    {
      icon: "shield",
      title: "Quality first",
      description:
        "Excellence in every pixel and every line of code — reviewed before it ships.",
    },
    {
      icon: "clock",
      title: "On-time delivery",
      description:
        "Fixed milestones, transparent timelines, and projects delivered on schedule.",
    },
    {
      icon: "headphones",
      title: "24/7 support",
      description:
        "Round-the-clock assistance so a problem never has to wait until morning.",
    },
  ],
};

/**
 * The people behind the studio.
 *
 * PLACEHOLDERS: names, photos and social links are stubs. Drop portraits into
 * `public/team/` and point `photo` at them (e.g. "/team/ali.jpg"); until then
 * each card falls back to an initials panel. Set `socials[].href` to the real
 * profiles - entries left as "#" are hidden rather than rendered as dead links.
 */
export const team = {
  eyebrow: "The studio",
  title: "Founder-led,",
  titleHighlight: "close to the work",
  description:
    "A small senior team, not a account-manager relay. The people you speak with are the ones designing and building your product.",
  members: [
    {
      name: "Founder Name",
      role: "Founder — Product Designer",
      photo: null,
      line: "Leads strategy, UX and interface work across every engagement.",
      socials: [
        { label: "LinkedIn", icon: "linkedin", href: "#" },
        { label: "X", icon: "x", href: "#" },
        { label: "Instagram", icon: "instagram", href: "#" },
      ],
    },
    {
      name: "Co-Founder Name",
      role: "Co-Founder — Developer",
      photo: null,
      line: "Owns architecture, engineering and everything that has to run in production.",
      socials: [
        { label: "LinkedIn", icon: "linkedin", href: "#" },
        { label: "GitHub", icon: "github", href: "#" },
        { label: "X", icon: "x", href: "#" },
      ],
    },
  ],
};

export const services = {
  eyebrow: "What we offer",
  title: "Everything you need,",
  titleHighlight: "under one roof",
  description:
    "Product design, engineering, AI and automation in the same room — take one service on its own, or let them compound on each other.",
  items: [
    {
      icon: "penTool",
      title: "Product Design & UI/UX",
      description:
        "Research, flows and interfaces for products people come back to — from the first wireframe to a design system your team can build on.",
      capabilities: [
        "SaaS Product Design",
        "Web & Mobile App UI/UX",
        "UX Research & User Flows",
        "Wireframes & Interactive Prototypes",
        "Design Systems",
        "UX Audits & Product Redesigns",
        "Dashboard & Admin Panel Design",
      ],
    },
    {
      icon: "code",
      title: "Web Development",
      description:
        "Landing pages, storefronts and full SaaS platforms, built front to back on a stack your team can maintain after we hand it over.",
      capabilities: [
        "Custom Web Applications",
        "SaaS Platforms",
        "Business Websites",
        "Landing Pages",
        "E-commerce Development",
        "Frontend & Backend Development",
        "WordPress & Shopify Development",
        "API Development & Integrations",
      ],
    },
    {
      icon: "smartphone",
      title: "Mobile App Development",
      description:
        "Native and cross-platform apps shipped to both stores, with the backend and integrations that keep them running behind them.",
      capabilities: [
        "iOS Applications",
        "Android Applications",
        "Cross-platform Mobile Apps",
        "Mobile SaaS Products",
        "Backend & API Integration",
      ],
    },
    {
      icon: "sparkles",
      title: "AI Development",
      description:
        "LLM features that earn their place in the product — chat, agents and retrieval wired into your own data, not a demo bolted on the side.",
      capabilities: [
        "AI-powered Web Applications",
        "AI SaaS Products",
        "AI Chatbots",
        "AI Agents",
        "LLM Integrations",
        "Custom AI Features",
        "RAG & Knowledge-base Systems",
        "AI Workflow Automation",
      ],
    },
    {
      icon: "workflow",
      title: "Business Automation",
      description:
        "The manual steps between your tools, removed — n8n flows, CRM triggers and integrations that keep running without anyone watching.",
      capabilities: [
        "n8n Automation",
        "CRM Automation",
        "Marketing & Sales Automation",
        "Internal Workflow Automation",
        "Third-party API Integrations",
        "AI-assisted Business Processes",
      ],
    },
    {
      icon: "blocks",
      title: "Custom Business Systems",
      description:
        "CRMs, portals and internal tools shaped around how your business already works, instead of bending the business around the software.",
      capabilities: [
        "CRM Systems",
        "ERP Solutions",
        "Customer & Client Portals",
        "Admin Panels",
        "Internal Management Systems",
        "Support & Ticketing Systems",
        "Reporting & Analytics Dashboards",
        "Booking & Marketplace Platforms",
      ],
    },
    {
      icon: "rocket",
      title: "MVP & Startup Development",
      description:
        "Idea to something real in users' hands — scoped tight, built fast, and iterated on once the first round of feedback lands.",
      capabilities: [
        "Idea to MVP",
        "Product Strategy",
        "Feature Prioritization",
        "UX/UI Design",
        "MVP Development",
        "Prototype Development",
        "Product Launch Support",
        "Post-launch Iterations",
      ],
    },
    {
      icon: "users",
      title: "Dedicated & White-label Teams",
      description:
        "Designers and engineers who plug into your team or ship under your brand — for overflow weeks or for the long run.",
      capabilities: [
        "Dedicated Developers",
        "Dedicated Product Designers",
        "Development Outsourcing",
        "Agency Overflow Support",
        "White-label Design & Development",
        "Project-based Technical Teams",
      ],
    },
  ],
};

export const work = {
  eyebrow: "Selected work",
  title: "Recent work,",
  titleHighlight: "and what it moved",
  description:
    "Builds across healthcare, retail and hiring — with the number each one was measured against.",
  categories: ["All", "Web Development", "E-Commerce"],
  projects: [
    {
      title: "Health Mate",
      featured: true,
      metric: "–64%",
      metricLabel: "time to first insight",
      category: "Web Development",
      description:
        "AI-powered health report analyzer that turns dense medical PDFs into plain-language insights and next steps.",
      tech: ["Next.js", "AI Integration", "Healthcare"],
      accent: "from-sky-500 to-cyan-400",
      year: "2025",
    },
    {
      title: "Halwaiii",
      featured: false,
      metric: "3.4%",
      metricLabel: "checkout conversion",
      category: "E-Commerce",
      description:
        "Premium Pakistani sweets storefront that pairs heritage craftsmanship with a modern shopping experience.",
      tech: ["E-Commerce", "React", "Payments"],
      accent: "from-amber-500 to-orange-400",
      year: "2025",
    },
    {
      title: "GracePoint Medical",
      featured: false,
      metric: "3×",
      metricLabel: "placements per month",
      category: "Web Development",
      description:
        "Healthcare staffing platform connecting medical professionals with facilities across three continents.",
      tech: ["Next.js", "Healthcare", "Staffing"],
      accent: "from-blue-600 to-indigo-500",
      year: "2024",
    },
    {
      title: "Aurea Collective",
      featured: false,
      metric: "+180%",
      metricLabel: "completed bookings",
      category: "Web Development",
      description:
        "Mobile beauty services platform specialising in accessible, sensory-friendly appointments and booking.",
      tech: ["React", "Accessibility", "Booking"],
      accent: "from-fuchsia-500 to-pink-400",
      year: "2024",
    },
    {
      title: "Quality Care Living",
      featured: false,
      metric: "+41%",
      metricLabel: "enquiry rate",
      category: "Web Development",
      description:
        "Senior care home website with warm aesthetics, virtual tours and a full service showcase.",
      tech: ["Next.js", "Design", "Healthcare"],
      accent: "from-emerald-500 to-teal-400",
      year: "2024",
    },
    {
      title: "Workoura",
      featured: true,
      metric: "18k",
      metricLabel: "active listings",
      category: "Web Development",
      description:
        "Modern job board connecting candidates with verified employers, built for scale from day one.",
      tech: ["Next.js", "Job Portal", "Full-Stack"],
      accent: "from-violet-500 to-purple-400",
      year: "2023",
    },
  ],
};

export const packages = {
  eyebrow: "Our packages",
  title: "Clear pricing,",
  titleHighlight: "no surprises",
  description:
    "Fixed-scope starting points for the work we do most. Anything outside them gets scoped and quoted the same way — one number, agreed up front.",
  categories: ["All", "Design", "Engineering", "AI & Automation", "Teams"],
  plans: [
    {
      name: "Product Design Sprint",
      category: "Design",
      price: 2900,
      unit: "/ project",
      blurb: "Research to clickable prototype",
      featured: true,
      features: [
        "Discovery workshop",
        "User flows & IA",
        "Wireframes",
        "High-fidelity UI",
        "Interactive prototype",
        "2 revision rounds",
        "Handoff to engineering",
        "Source files included",
      ],
    },
    {
      name: "Design System",
      category: "Design",
      price: 3500,
      unit: "/ project",
      blurb: "One language for every screen",
      featured: false,
      features: [
        "Component library",
        "Typography & colour scales",
        "Spacing & layout rules",
        "Interaction states",
        "Accessibility pass",
        "Figma variables",
        "Usage documentation",
        "Team walkthrough",
      ],
    },
    {
      name: "Business Website",
      category: "Engineering",
      price: 2499,
      unit: "/ project",
      blurb: "Marketing site that converts",
      featured: false,
      features: [
        "Up to 10 pages",
        "Responsive build",
        "CMS integration",
        "Contact & lead forms",
        "SEO fundamentals",
        "Analytics setup",
        "Performance budget",
        "3 months support",
      ],
    },
    {
      name: "E-commerce Store",
      category: "Engineering",
      price: 3999,
      unit: "/ project",
      blurb: "A storefront built to sell",
      featured: false,
      features: [
        "Up to 200 products",
        "Custom theme",
        "Multiple payment options",
        "Inventory management",
        "Shipping integration",
        "Checkout optimisation",
        "Analytics dashboard",
        "3 months support",
      ],
    },
    {
      name: "MVP Build",
      category: "Engineering",
      price: 9500,
      unit: "/ project",
      blurb: "Idea to launched product",
      featured: true,
      features: [
        "Product strategy",
        "Feature prioritisation",
        "UX/UI design",
        "Full-stack build",
        "Auth & payments",
        "Staging from week one",
        "Launch support",
        "First iteration round",
      ],
    },
    {
      name: "AI Feature Build",
      category: "AI & Automation",
      price: 4500,
      unit: "/ project",
      blurb: "LLM features in your product",
      featured: false,
      features: [
        "Use-case scoping",
        "LLM integration",
        "RAG over your data",
        "Chat or agent interface",
        "Prompt & eval harness",
        "Cost and rate controls",
        "Monitoring hooks",
        "Handover documentation",
      ],
    },
    {
      name: "Automation Setup",
      category: "AI & Automation",
      price: 1900,
      unit: "/ project",
      blurb: "The manual steps, removed",
      featured: false,
      features: [
        "Process audit",
        "n8n workflow build",
        "CRM triggers",
        "Third-party integrations",
        "Error handling & alerts",
        "Run-cost estimate",
        "Team training",
        "30 days of tuning",
      ],
    },
    {
      name: "Dedicated Developer",
      category: "Teams",
      price: 4500,
      unit: "/ month",
      blurb: "An engineer inside your team",
      featured: false,
      features: [
        "Full-time allocation",
        "Your tools and standups",
        "Senior-level engineer",
        "Code review included",
        "Direct Slack access",
        "Monthly reporting",
        "White-label available",
        "One month notice",
      ],
    },
  ],
};

export const testimonials = {
  eyebrow: "Client stories",
  title: "What it's like to work with us",
  items: [
    {
      quote:
        "They shipped in six weeks what our previous agency couldn't finish in six months. The difference was the process, not the price.",
      name: "Sarah Whitfield",
      role: "Founder, GracePoint Medical",
      initials: "SW",
    },
    {
      quote:
        "Our organic traffic tripled in one quarter. They explained every decision in language I could take straight to my board.",
      name: "Daniel Okafor",
      role: "CMO, Workoura",
      initials: "DO",
    },
    {
      quote:
        "The storefront looks like a brand ten times our size. Conversion went from 1.2% to 3.4% in the first month.",
      name: "Ayesha Rahman",
      role: "Owner, Halwaiii",
      initials: "AR",
    },
    {
      quote:
        "Genuinely responsive team. Questions answered same day, and they pushed back when we were about to make a mistake.",
      name: "Marco Bellini",
      role: "Product Lead, Health Mate",
      initials: "MB",
    },
  ],
};

export const faqs = {
  eyebrow: "FAQ",
  title: "Questions, answered",
  items: [
    {
      q: "How long does a typical project take?",
      a: "A marketing site runs 3–5 weeks, an e-commerce build 6–8 weeks, and a custom web app 10–16 weeks. You get a dated milestone plan before we start, and weekly demos throughout.",
    },
    {
      q: "Do you work with fixed prices or hourly rates?",
      a: "Every package on this page is fixed-scope and fixed-price, so you know the total before we begin. For work that doesn't fit a package, we scope it together and quote a fixed price.",
    },
    {
      q: "What happens after launch?",
      a: "Every development package includes three months of support — bug fixes, small content changes and performance monitoring. After that you can move to a monthly retainer or take full ownership of the code.",
    },
    {
      q: "Who owns the code and design files?",
      a: "You do, completely. On final payment we transfer the repository, design source files and every account we set up on your behalf. There is no lock-in.",
    },
    {
      q: "Can you work with our existing team?",
      a: "Regularly. We embed alongside in-house designers and developers, follow your conventions and review process, and hand back work your team can maintain.",
    },
  ],
};

/** Shared by the hero enquiry form and the enquiry modal. */
export const serviceOptions = [
  "Product Design & UI/UX",
  "Web Development",
  "Mobile App Development",
  "AI Development",
  "Business Automation",
  "Custom Business Systems",
  "MVP & Startup Development",
  "Dedicated & White-label Teams",
  "Something else",
];

export const budgetOptions = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $7,000",
  "$7,000 – $10,000",
  "$10,000+",
  "Other",
];

export const inquiry = {
  title: "Start your project",
  description:
    "Tell us the essentials and we'll come back within one business day with next steps.",
  successTitle: "Thanks — we've got it",
  successBody:
    "Your enquiry is with us. Expect a reply within one business day, usually sooner.",
};

export const careers = {
  eyebrow: "Careers",
  title: "Build the work",
  titleHighlight: "you want to sign",
  description:
    "We hire for craft and curiosity over years on a CV. Tell us what you do well, show us something you're proud of, and we'll take it from there.",
  perks: [
    "Remote-first, flexible hours",
    "Real ownership from week one",
    "Learning budget every year",
  ],
  positions: [
    "Web Developer",
    "WordPress Developer",
    "Shopify Developer",
    "UI/UX Designer",
    "Graphic Designer",
    "Front-End Developer",
    "Back-End Developer",
    "Full-Stack Developer",
    "SEO Specialist",
    "Digital Marketing Specialist",
    "Project Manager",
    "Sales / Business Development",
    "Lead Generation Expert",
    "Content Writer",
    "Social Media Manager",
  ],
  successTitle: "Application received",
  successBody:
    "Thanks for applying. We read every application ourselves and will be in touch if there's a fit.",
};
