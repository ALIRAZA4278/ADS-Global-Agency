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
  offices: ["Dubai", "New York", "London"],
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

export const services = {
  eyebrow: "What we offer",
  title: "Everything you need,",
  titleHighlight: "under one roof",
  description:
    "Design, engineering and growth in the same room — take one service on its own, or let them compound on each other.",
  items: [
    {
      icon: "code",
      title: "Web Development",
      description:
        "Fast, scalable and beautiful websites — from marketing sites to custom web applications that captivate and convert.",
      tags: ["Next.js", "Headless CMS", "Web apps"],
    },
    {
      icon: "penTool",
      title: "Logo Design",
      description:
        "Logo systems that carry your identity — timeless, flexible marks delivered trademark-ready in every format.",
      tags: ["Identity", "Vector", "Brand kit"],
    },
    {
      icon: "palette",
      title: "Graphic Design",
      description:
        "Banners, social graphics, brochures and marketing collateral that make your brand impossible to scroll past.",
      tags: ["Social", "Print", "Collateral"],
    },
    {
      icon: "video",
      title: "Video Editing",
      description:
        "Editing that holds attention — clean transitions, motion graphics and storytelling built for the feed.",
      tags: ["Reels", "Motion", "4K"],
    },
    {
      icon: "trendingUp",
      title: "Digital Marketing",
      description:
        "Data-driven campaigns with measurable growth — paid media, content marketing and conversion strategy.",
      tags: ["PPC", "Content", "CRO"],
    },
    {
      icon: "search",
      title: "SEO Optimization",
      description:
        "Technical and on-page SEO that lifts rankings and brings in visitors with real buying intent.",
      tags: ["Technical", "Local", "Link building"],
    },
    {
      icon: "share",
      title: "Social Media",
      description:
        "Strategy, content and community management that build a presence people actually want to follow.",
      tags: ["Strategy", "Content", "Community"],
    },
    {
      icon: "cart",
      title: "E-Commerce",
      description:
        "Storefronts with secure payments, inventory management and a checkout that gets out of the way.",
      tags: ["Shopify", "Payments", "Inventory"],
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
  title: "Clear pricing, no surprises",
  description:
    "Pick the package that fits where your business is right now — every tier is fixed-scope and fixed-price.",
  categories: ["All", "Development", "Design", "Marketing"],
  plans: [
    {
      name: "Web Development",
      category: "Development",
      price: 999,
      unit: "/ project",
      blurb: "Ideal for growing businesses",
      featured: true,
      features: [
        "10-page website",
        "Responsive design",
        "Contact form & live chat",
        "Advanced SEO setup",
        "3 months support",
        "Custom animations",
        "CMS integration",
        "Performance optimization",
      ],
    },
    {
      name: "E-Commerce",
      category: "Development",
      price: 1499,
      unit: "/ project",
      blurb: "A professional online store",
      featured: false,
      features: [
        "Up to 200 products",
        "Multiple payment options",
        "Custom theme design",
        "Inventory management",
        "Shipping integration",
        "3 months support",
        "Analytics dashboard",
        "Multi-currency",
      ],
    },
    {
      name: "Logo Design",
      category: "Design",
      price: 349,
      unit: "/ project",
      blurb: "Professional logo package",
      featured: false,
      features: [
        "5 logo concepts",
        "5 revisions",
        "All file formats",
        "Vector files (AI, EPS, SVG)",
        "Colour & B/W versions",
        "Social media kit",
        "Brand colour palette",
        "Full brand guidelines",
      ],
    },
    {
      name: "Graphic Design",
      category: "Design",
      price: 449,
      unit: "/ project",
      blurb: "Complete graphics package",
      featured: false,
      features: [
        "15 social media graphics",
        "5 banner designs",
        "Brochure design",
        "Flyer & poster design",
        "All source files",
        "5 revisions",
        "Print-ready files",
        "48-hour delivery",
      ],
    },
    {
      name: "SEO Optimization",
      category: "Marketing",
      price: 499,
      unit: "/ month",
      blurb: "Comprehensive SEO strategy",
      featured: false,
      features: [
        "Full website audit",
        "Keyword research (50)",
        "On-page & off-page SEO",
        "Technical SEO",
        "Link building (10/month)",
        "Bi-weekly reports",
        "Competitor analysis",
        "Local SEO setup",
      ],
    },
    {
      name: "Social Media",
      category: "Marketing",
      price: 599,
      unit: "/ month",
      blurb: "Grow your online reach",
      featured: true,
      features: [
        "4 platforms managed",
        "15 posts per week",
        "Advanced analytics",
        "Stories & reels",
        "Weekly reports",
        "Paid ads management",
        "Content strategy",
        "Community management",
      ],
    },
    {
      name: "Video Editing",
      category: "Design",
      price: 499,
      unit: "/ project",
      blurb: "Professional video editing",
      featured: false,
      features: [
        "Up to 15 min video",
        "Advanced transitions",
        "Colour correction",
        "Motion graphics",
        "Sound design",
        "Subtitles & captions",
        "4 revisions",
        "4K export",
      ],
    },
    {
      name: "Digital Marketing",
      category: "Marketing",
      price: 899,
      unit: "/ month",
      blurb: "Full-funnel growth",
      featured: false,
      features: [
        "PPC campaign management",
        "Landing page design",
        "Conversion tracking",
        "Email marketing",
        "A/B testing",
        "Monthly strategy call",
        "Attribution reporting",
        "Retargeting setup",
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
  "UI/UX",
  "Website Development",
  "WordPress / Shopify Website",
  "Custom Website",
  "Mobile App",
  "Logo Design",
  "Graphic Design",
  "Business Branding",
  "Social Media Creatives",
  "Website Redesign",
  "Web Maintenance",
  "Web Hosting",
  "Domain",
  "Business Emails",
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
