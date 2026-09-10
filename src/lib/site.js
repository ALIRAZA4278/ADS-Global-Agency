/**
 * Single source of truth for every piece of copy on the site.
 * Change the brand name, services, prices or projects here — nothing else.
 */

export const brand = {
  name: "ADS Global",
  fullName: "ADS Global Agency",
  tagline: "Designing meaningful digital experiences that drive real impact.",
  email: "support@adsglobalagency.com",
  /**
   * WhatsApp is the only number published, and only through the floating
   * chat button — wa.me wants digits with no plus, spaces or punctuation.
   */
  whatsapp: {
    display: "+61 8 9468 0239",
    digits: "61894680239",
    message: "Hi ADS Global, I'd like to talk about a project.",
  },
  offices: ["Australia", "Canada", "Dubai", "US", "UK"],
  socials: [
    {
      label: "LinkedIn",
      icon: "linkedin",
      href: "https://www.linkedin.com/company/aussie-design-solutions/",
    },
    {
      label: "Instagram",
      icon: "instagram",
      href: "https://www.instagram.com/adsglobalagency",
    },
    {
      label: "Facebook",
      icon: "facebook",
      href: "https://www.facebook.com/share/1DCBkZ1kr1/",
    },
  ],
};

/**
 * Section anchors tracked by the header. "Contact" is deliberately absent —
 * the enquiry form now lives inside the hero, so a nav entry for it would
 * light up the moment the page loads.
 */
export const navLinks = [
  { label: "About", href: "#about" },
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
  /**
   * Trustpilot badge beside the eyebrow. Drop the profile URL into `href` and
   * it becomes a link; until then it renders as plain text rather than an
   * anchor that goes nowhere.
   */
  rating: {
    label: "Rated on Trustpilot",
    href: null,
  },
  trust: [
    "Fixed scope, fixed price",
    "Reply within one business day",
    "You own the code and the files",
  ],
  quickStats: [
    { value: "700+", label: "Projects delivered" },
    { value: "50+", label: "Team members" },
    { value: "10+", label: "Years in business" },
  ],
  formTitle: "Get a free quote",
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
  title: "See the work,",
  titleHighlight: "not just the pitch",
  description:
    "Three archives, kept current: branding and graphics, live websites you can click through, and product design straight from Figma.",
  /**
   * The full archives live outside the site, so each discipline links out to
   * its own folder rather than trying to mirror them here.
   */
  portfolios: [
    {
      label: "Graphic",
      title: "Logo, branding & graphics",
      description:
        "Identity systems, marketing collateral and social creative, project by project.",
      icon: "palette",
      cta: "View full graphic portfolio",
      href: "https://drive.google.com/drive/folders/1eL8iZGO_8uoR3ZbCYk4FJ9ajjjI_TKfI",
    },
    {
      label: "Web",
      title: "Live websites & storefronts",
      description:
        "Sites and stores currently in production — open them and click around.",
      icon: "code",
      cta: "View full web portfolio",
      href: "https://drive.google.com/drive/folders/19AqetSwk005-epCGqT8kEX57_mSrzpd_",
    },
    {
      label: "UI/UX",
      title: "Product design & Figma files",
      description:
        "Flows, wireframes and interface work, linked straight through to Figma.",
      icon: "penTool",
      cta: "View full UI/UX portfolio",
      href: "https://docs.google.com/document/d/15fkx5fkyVJLHw-_aYh6atkC_tza5ohncllpVZW3zgyI/edit?usp=drivesdk",
    },
  ],
};

export const packages = {
  eyebrow: "Our packages",
  title: "Clear pricing,",
  titleHighlight: "no surprises",
  description:
    "Fixed-scope packages across everything we build. Pick a category to see its tiers \u2014 every price is the full cost, agreed before we start.",
  categories: [
    "All",
    "Website Design",
    "E-Commerce",
    "Social Media Marketing",
    "Search Engine Marketing",
    "Animated Video",
    "Branding",
    "Book Publishing",
    "Mobile App Development",
    "Web Portal / App",
    "Website Hosting",
    "Website Maintenance",
    "Social Media Ads",
    "Logo Design",
    "AI & Automation",
  ],
  plans: [
    {
      name: "Elite Website Package",
      category: "Website Design",
      price: 1245,
      unit: "one-off fee",
      blurb: "Ideal For Small Businesses Just Starting Online",
      featured: false,
      features: [
        "Upto 15 Website Pages",
        "Mobile Responsive",
        "Website Dashboard (CMS)",
        "Online Booking/Appointment",
        "Payment Gateway Integration",
        "Search Engine Submission",
      ],
    },
    {
      name: "Corporate Website Package",
      category: "Website Design",
      price: 1998,
      unit: "one-off fee",
      featured: true,
      features: [
        "15-20 Website Pages",
        "Dynamic & High End Design",
        "Unlimited Products",
        "Striking Hover Effects",
        "Search Engine Submission",
        "3 Months Maintenance",
      ],
    },
    {
      name: "Business Website Package",
      category: "Website Design",
      price: 2445,
      unit: "one-off fee",
      featured: false,
      features: [
        "15 Sec Promotional Video",
        "SEO Meta Tags",
        "Unlimited Website Pages",
        "Full Shopping Cart Integration",
        "FREE Domain & Hosting (3 Years)",
        "6 Months Maintenance",
      ],
    },
    {
      name: "Starter eStore Package",
      category: "E-Commerce",
      price: 799,
      unit: "one-off fee",
      blurb: "Ideal For Small Businesses Just Starting Online",
      featured: false,
      features: [
        "Up to 25 Product Listings",
        "Dynamic & Responsive Design",
        "Payment Gateway Integration",
        "On-Page SEO Optimization",
        "Training Session on Website Management System",
        "FREE 1 Month Post Launch Support",
      ],
    },
    {
      name: "Standard Growth Package",
      category: "E-Commerce",
      price: 1499,
      unit: "one-off fee",
      blurb: "Best For Scaling eCommerce Storefronts",
      featured: true,
      features: [
        "Unlimited Products & Categories",
        "Custom Storefront (Shopify or Woocommerce)",
        "Advanced Filtering & Search Features",
        "Customer Reviews & Social Media Sharing",
        "Google & Facebook Pixel Integration",
        "FREE 3 Months Maintenance",
      ],
    },
    {
      name: "Premium Business Package",
      category: "E-Commerce",
      price: 2999,
      unit: "one-off fee",
      blurb: "Best For Large-Scale eCommerce Business",
      featured: false,
      features: [
        "All Growth Package PLUS:",
        "AI Product Recommendations",
        "Multi-Currency & Multilingual",
        "Upsell/Cross-Sell Scripting",
        "Premium Hosting + SSL Security",
        "FREE 6 Months Full Maintenance",
      ],
    },
    {
      name: "Social Starter Package",
      category: "Social Media Marketing",
      price: 499,
      unit: "per month",
      blurb: "Ideal For Small Businesses Just Starting Social Media",
      featured: false,
      features: [
        "12 Social Media Posts (per month)",
        "Facebook & Instagram Management",
        "Hashtag Research",
        "Business Accounts Creation",
        "100 Likes & Followers (per month)",
        "Community Management",
      ],
    },
    {
      name: "Social Growth Package",
      category: "Social Media Marketing",
      price: 999,
      unit: "per month",
      blurb: "Best For Businesses Awareness & Audience Engagement",
      featured: true,
      features: [
        "20 Social Media Posts (per month)",
        "Multi-Platform Management",
        "Monthly Content Calendar",
        "Audience Engagement Strategy",
        "500 Likes & Followers (per month)",
        "Ad Strategy & Campaign Creation",
      ],
    },
    {
      name: "Premium Social Package",
      category: "Social Media Marketing",
      price: 1999,
      unit: "per month",
      blurb: "Best For Aggressive Business Growth & Boost Sales",
      featured: false,
      features: [
        "30 Social Media Posts (per month)",
        "Reels & Stories Included",
        "Advanced Growth Strategy",
        "Lead Generation & Tracking",
        "1,000 Likes & Followers (per month)",
        "Ad Strategy & Campaign Management",
      ],
    },
    {
      name: "Starter SEO Package",
      category: "Search Engine Marketing",
      price: 499,
      unit: "per month",
      blurb: "Ideal For Small Businesses Just Starting Online",
      featured: false,
      features: [
        "Keyword Research & Strategy",
        "On-Page Optimization",
        "Technical SEO Audit",
        "Online Business Listings",
        "Website Content Optimization",
        "Monthly Performance Reporting",
      ],
    },
    {
      name: "Growth SEO Package",
      category: "Search Engine Marketing",
      price: 999,
      unit: "per month",
      blurb: "Best For Fast Growing Businesses & eCommerce Stores",
      featured: true,
      features: [
        "Includes Starter Package PLUS:",
        "Competitor Analysis",
        "Local SEO Boost",
        "Content Marketing Strategy",
        "10 High-Quality Backlinks",
        "Analytics & Search Console Setup",
      ],
    },
    {
      name: "Premium SEO Package",
      category: "Search Engine Marketing",
      price: 1999,
      unit: "per month",
      blurb: "High-Growth Businesses & Competitive Industries",
      featured: false,
      features: [
        "Includes Growth Package PLUS:",
        "Conversion Rate Optimization",
        "AI-Powered Content Strategy",
        "20 High-Quality Backlinks",
        "Retargeting & Remarketing",
        "Advanced Analytics & Heatmaps",
      ],
    },
    {
      name: "Basic Animation Package",
      category: "Animated Video",
      price: 599,
      unit: "one-off fee",
      blurb: "Best For Social Media Ads, Explainer or Promotional Videos & Startup Pitches",
      featured: false,
      features: [
        "2D Animation (30 Sec)",
        "Voiceover & Background Music",
        "Basic Storyboard",
        "Text & Logo Animation",
        "Revisions Included",
        "Fast Turnaround (7-10 Days)",
      ],
    },
    {
      name: "Advanced Animation",
      category: "Animated Video",
      price: 999,
      unit: "one-off fee",
      blurb: "Product Launches, Crowdfunding Campaigns & Corporate Training Videos",
      featured: true,
      features: [
        "2D Animation (60 Sec)",
        "Professional Scriptwriting",
        "Premium Voiceover",
        "Kinetic Typography",
        "Revisions Included",
        "Dynamic Transitions",
      ],
    },
    {
      name: "Premium Animation",
      category: "Animated Video",
      price: 1999,
      unit: "one-off fee",
      blurb: "Corporate Presentations, Video Ads, Mobile App Demos & SaaS or Digital Product Videos",
      featured: false,
      features: [
        "High-End 2D Animation (90 Sec)",
        "Advanced Special Effects",
        "Full Branding Integration",
        "High-Resolution (4K)",
        "Revisions Included",
        "Subtitles & Multilingual Support",
      ],
    },
    {
      name: "Starter Brand Package",
      category: "Branding",
      price: 499,
      unit: "one-off fee",
      blurb: "Ideal For Small Businesses Just Starting Fresh",
      featured: false,
      features: [
        "3 Logo Design Concepts",
        "Unlimited Revisions",
        "Business Card Design (Print-Ready)",
        "Letterhead, Invoice & Email Signature",
        "Social Media Kit (Facebook)",
        "High Resolution Final Files & Formats",
      ],
    },
    {
      name: "Professional Brand Package",
      category: "Branding",
      price: 999,
      unit: "one-off fee",
      blurb: "Best For Small Businesses Looking To Scale",
      featured: true,
      features: [
        "6 Unique Logo Concepts",
        "Business Card Design (500 Prints)",
        "Bi-Fold Brochure Design (Double-Sided)",
        "Social Media Kit (Facebook & Instagram)",
        "Upto 3 Pages Website Design + Backend Dashboard",
        "48 to 72 hrs Turnaround Time",
      ],
    },
    {
      name: "Premium Branding Kit",
      category: "Branding",
      price: 1999,
      unit: "one-off fee",
      blurb: "Complete Solution For Fast Growing Businesses",
      featured: false,
      features: [
        "8 Custom Logo Concepts",
        "Complete Brand Style Guidelines",
        "Brochure & Standee Design (Single-Sided)",
        "Social Media Kit (FB, IG, X, TikTok)",
        "5 Pages Custom Website Design + Domain & Hosting",
        "Custom Product Packaging & Label Design",
      ],
    },
    {
      name: "Starter Book Publishing",
      category: "Book Publishing",
      price: 999,
      unit: "one-off fee",
      blurb: "Best For Authors Seeking Visibility & Professional Presence",
      featured: false,
      features: [
        "Manuscript Proofreading",
        "General Editing (Grammar & Spelling Corrections)",
        "Standard Formatting (6in x 9in)",
        "ISBN, Author Bio & Back Cover Creation",
        "Global Print-On-Demand Distribution Setup",
        "Publication & Distribution in E-Book Format",
      ],
    },
    {
      name: "Standard Book Publishing",
      category: "Book Publishing",
      price: 1499,
      unit: "one-off fee",
      blurb: "Authors Aiming To Publish Across Multiple Platforms",
      featured: true,
      features: [
        "Complete Manuscript Proofreading",
        "Line By Line Editing (Grammar, Flow & Structure)",
        "Formatting (as per Trim Size)",
        "Author Central Account Creation",
        "Copyrights + ISBN + Barcode + Cover Design (Front & Back)",
        "Publication & Distribution in E-Book & Paperback Formats",
      ],
    },
    {
      name: "Premium Book Publishing",
      category: "Book Publishing",
      price: 2499,
      unit: "one-off fee",
      blurb: "Ultimate Global Distribution & Marketing Solution For Authors",
      featured: false,
      features: [
        "Professional Proofreading & Editorial Review",
        "Complete Editing (Developmental & Structural)",
        "Professional Book Formatting (as per Trim Size)",
        "Upto 3 Pages Author Website Design (Unlimited Books)",
        "Copyrights + ISBN + Barcode + Cover Design (Front & Back)",
        "Publication & Distribution in E-Book, Paperback & Hardcover",
      ],
    },
    {
      name: "Basic App Package",
      category: "Mobile App Development",
      price: 4999,
      unit: "one-off fee",
      blurb: "Ideal For Small Businesses Just Starting Online",
      featured: false,
      features: [
        "Simple Android/iOS App",
        "Unlimited Revisions",
        "Up to 5 Screens Design",
        "FREE Splash Screen",
        "Basic Features (Forms, Contact, Maps)",
        "Publishing on Google Play & App Store",
      ],
    },
    {
      name: "Business App Package",
      category: "Mobile App Development",
      price: 9999,
      unit: "one-off fee",
      blurb: "Best For Fast Growing Businesses Scaling Up",
      featured: true,
      features: [
        "Android & iOS Development",
        "Unlimited Revisions",
        "Custom UI/UX Design",
        "10+ Screens & Advanced Features",
        "Payment Gateway Integration",
        "Back-end Management System",
      ],
    },
    {
      name: "Enterprise App Package",
      category: "Mobile App Development",
      price: 19999,
      unit: "one-off fee",
      blurb: "Best For Complex Business Needs & Process Automation",
      featured: false,
      features: [
        "Fully Custom App Development",
        "AI/ML, AR/VR, & Advanced Features",
        "API & Backend Development",
        "Marketplace & E-Commerce Capabilities",
        "Enterprise-Level Security & Compliance",
        "Ongoing Maintenance & Support",
      ],
    },
    {
      name: "Starter Web App Package",
      category: "Web Portal / App",
      price: 4999,
      unit: "one-off fee",
      blurb: "Ideal For Small Businesses Just Starting Automation",
      featured: false,
      features: [
        "Custom UI/UX Design For Upto 5 Screens",
        "Admin Dashboard With User Management System",
        "Basic Analytics & User Registration System",
        "Integration With One Database (MySQL or Firebase)",
        "Mobile Responsive Web App (Desktop & Mobile)",
        "FREE 30 Days Post-Launch Bug Fixing Support",
      ],
    },
    {
      name: "Business Web App Package",
      category: "Web Portal / App",
      price: 9999,
      unit: "one-off fee",
      blurb: "Ideal For Service-Based Businesses & Client Portals",
      featured: true,
      features: [
        "Custom UI/UX Design With Upto 15 Screens",
        "Multi-Level User Access Roles & Permissions",
        "Dynamic Admin & User Dashboard With Login",
        "API Integration (Payments, CRM, etc.)",
        "Email/SMS Notification System Integration",
        "FREE 2 Month Support & Revisions Included",
      ],
    },
    {
      name: "Enterprise Web App Package",
      category: "Web Portal / App",
      price: 19999,
      unit: "one-off fee",
      blurb: "Best For Full-Scale Business Systems & SaaS Products",
      featured: false,
      features: [
        "Advanced UI/UX Design With Unlimited Screens",
        "Role-Based Access, Subscription Models & User Tiers",
        "Payment Gateway, Live Chat & Third-Party APIs",
        "AI Automation Features (e.g. Chatbots, Workflows)",
        "Full-Scale Progressive Web App (PWA) Deployment",
        "Scalable Cloud Deployment (AWS, Firebase, Azure)",
      ],
    },
    {
      name: "Startup Hosting Package",
      category: "Website Hosting",
      price: 49,
      unit: "per month",
      blurb: "Best For Personal Sites & Landing Pages With Less Traffic",
      featured: false,
      features: [
        "1 Website Linked With 1 Domain",
        "10 GB SSD Cloud Hosting",
        "FREE SSL Certificate (One Year)",
        "5 Business Email Accounts",
        "99.9% Uptime Guarantee",
        "Daily Monitoring & Backups",
      ],
    },
    {
      name: "Business Hosting Package",
      category: "Website Hosting",
      price: 99,
      unit: "per month",
      blurb: "Designed For Small Businesses & Fast Growing Startups",
      featured: true,
      features: [
        "Host Upto 5 Websites (Get FREE Domain)",
        "50 GB SSD Storage & Unlimited Bandwidth",
        "Unlimited Business Email Accounts Setup",
        "FREE SSL Certificate & Site Malware Scanning",
        "cPanel Dashboard Access",
        "24/7 Customer Support Access",
      ],
    },
    {
      name: "Premium Hosting Package",
      category: "Website Hosting",
      price: 149,
      unit: "per month",
      blurb: "Built For eCommerce, Web Portals & High-Traffic Websites",
      featured: false,
      features: [
        "Host Unlimited Websites (Get FREE Domain)",
        "200 GB Ultra-Fast SSD & Unlimited Bandwidth",
        "Premium SSL, Firewall & Malware Scanner",
        "Cloudflare CDN Integration For Faster Website Load-Time",
        "Dedicated IP & DNS Management Tools",
        "FREE Website Creation & 3 Months Maintenance",
      ],
    },
    {
      name: "Basic Maintenance Plan",
      category: "Website Maintenance",
      price: 99,
      unit: "per month",
      blurb: "Ideal For Small Businesses Needing Essential Support",
      featured: false,
      features: [
        "Monthly Website Health & Performance Check",
        "Plugin & Theme Updates (WordPress Supported)",
        "Security Scans For Malware & Vulnerabilities",
        "Broken link identification & Quick Fix",
        "Basic Speed Optimization (Image & Cache Cleanup)",
        "Monthly Maintenance Report With Key Stats",
      ],
    },
    {
      name: "Standard Maintenance Plan",
      category: "Website Maintenance",
      price: 199,
      unit: "per month",
      blurb: "Best For Fast Growing Websites Needing Extra Protection",
      featured: true,
      features: [
        "Bi-Weekly Health Audits & Performance Checks",
        "Priority Plugin, CMS & Core File Updates",
        "Enhanced Security Firewall & Threat Monitoring",
        "Technical SEO Checks (Meta, Sitemap, etc.)",
        "Customer Support Email, Phone & Live Chat",
        "Detailed Monthly Report With Improvement Tips",
      ],
    },
    {
      name: "Premium Maintenance Plan",
      category: "Website Maintenance",
      price: 249,
      unit: "per month",
      blurb: "Best For High-Traffic, eCommerce & Powerful Sites",
      featured: false,
      features: [
        "Weekly Full-Site Audits & Performance Tuning",
        "Daily Backups With 90-Days Restore History",
        "Priority Bug Fixes & Emergency Troubleshooting",
        "Ongoing Speed Optimization & Server Caching",
        "Dedicated Account Manager & 24/7 Support Access",
        "Monthly Strategy Call & Performance Insights",
      ],
    },
    {
      name: "Basic Boost Package",
      category: "Social Media Ads",
      price: 499,
      unit: "per month",
      blurb: "Best For Local Reach, Increase Following & Brand Awareness",
      featured: false,
      features: [
        "Ad Setup For 1 Platform (Facebook or Instagram)",
        "Custom Static Ad Creatives (2-3 Designs)",
        "Copywriting For Short Ad Captions (Upto 3 Ads)",
        "Geo-Targeting For Local & Niche Audience",
        "Campaign Optimization Once Per Week",
        "Suggested Monthly Ad Budget: $200 - $500",
      ],
    },
    {
      name: "Growth Engagement Package",
      category: "Social Media Ads",
      price: 999,
      unit: "per month",
      blurb: "Ideal For Driving Traffic, Website Visits & Lead Generation",
      featured: true,
      features: [
        "Ad Campaigns on 2 Platforms (FB + IG or LinkedIn)",
        "Custom Creative Design (Carousel, Reels or Banners)",
        "Weekly Campaign Monitoring & Adjustments",
        "Pixel Setup & Retargeting (If Applicable)",
        "Detailed Monthly Performance Breakdown",
        "Suggested Monthly Ad Budget: $300 - $800",
      ],
    },
    {
      name: "Full Performance Package",
      category: "Social Media Ads",
      price: 2499,
      unit: "per month",
      blurb: "Best For Serious Businesses Focused on ROI & Scaling",
      featured: false,
      features: [
        "Cross-platform ad campaigns (FB, IG, LinkedIn & X)",
        "High-Converting Sales Funnel Strategy & Lead Generation",
        "Advanced Targeting (Lookalike, Interest & Behavior-Based)",
        "Video Ad, Carousel or Static Creatives Creation",
        "Retargeting, Pixel Tracking & Analytics Setup",
        "Suggested Monthly Ad Budget: $1,000",
      ],
    },
    {
      name: "Startup Logo Package",
      category: "Logo Design",
      price: 199,
      unit: "one-off fee",
      blurb: "Ideal For Small Businesses Just Starting",
      featured: false,
      features: [
        "3 Logo Design Concepts",
        "3 Revisions",
        "2 Dedicated Designers",
        "FREE Icon Design",
        "High-Resolution PNG & JPG",
        "Complete Ownership Rights",
      ],
    },
    {
      name: "Business Logo Package",
      category: "Logo Design",
      price: 399,
      unit: "one-off fee",
      blurb: "Best For Growing Businesses & eCommerce Stores",
      featured: true,
      features: [
        "5 Unique Logo Concepts",
        "Unlimited Revisions",
        "Unlimited Color Variations",
        "Business Card Design",
        "Vector Files (AI, EPS, SVG, PDF)",
        "Complete Ownership Rights",
      ],
    },
    {
      name: "Premium Logo Package",
      category: "Logo Design",
      price: 799,
      unit: "one-off fee",
      blurb: "Best For Fast Growing Small & Medium Businesses",
      featured: false,
      features: [
        "7+ Custom Logo Concepts",
        "Unlimited Revisions",
        "Full Branding Kit (Web & Social)",
        "Letterhead & Email Signature",
        "500 Printed Business Cards",
        "Complete Branding Guidelines",
      ],
    },
    {
      name: "Custom AI & Automation",
      category: "AI & Automation",
      price: null,
      unit: "scoped per project",
      blurb: "Built Around Your Data, Tools And Workflows",
      featured: true,
      features: [
        "AI Chatbots & Agents",
        "LLM Integrations & Custom AI Features",
        "RAG & Knowledge-base Systems",
        "n8n & Workflow Automation",
        "CRM, Marketing & Sales Automation",
        "Third-party API Integrations",
        "AI-assisted Internal Processes",
        "Scoped and quoted after a discovery call",
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
