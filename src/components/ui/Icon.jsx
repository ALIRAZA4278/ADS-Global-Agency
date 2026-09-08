import {
  Blocks,
  Braces,
  Clock,
  Code2,
  Headphones,
  Lightbulb,
  MapPin,
  Mail,
  Monitor,
  Palette,
  PenTool,
  Phone,
  Rocket,
  Search,
  Send,
  Smartphone,
  Sparkles,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Target,
  TrendingUp,
  Users,
  Video,
  Workflow,
} from "lucide-react";

/**
 * Content in `src/lib/site.js` refers to icons by name so the data file stays
 * free of JSX. This map is the only place those names are resolved.
 */
const registry = {
  blocks: Blocks,
  braces: Braces,
  cart: ShoppingCart,
  clock: Clock,
  code: Code2,
  headphones: Headphones,
  lightbulb: Lightbulb,
  mail: Mail,
  mapPin: MapPin,
  monitor: Monitor,
  palette: Palette,
  penTool: PenTool,
  phone: Phone,
  rocket: Rocket,
  search: Search,
  send: Send,
  smartphone: Smartphone,
  sparkles: Sparkles,
  share: Share2,
  shield: ShieldCheck,
  target: Target,
  trendingUp: TrendingUp,
  users: Users,
  video: Video,
  workflow: Workflow,
};

export function Icon({ name, className, ...props }) {
  const Glyph = registry[name] ?? Braces;
  return <Glyph className={className} strokeWidth={1.6} {...props} />;
}

/**
 * Lucide dropped brand marks in v1, so social glyphs are inlined here.
 */
const socialPaths = {
  linkedin: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.44-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  ),
  x: (
    <path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.2l-4.9-6.4L5.1 21H2l7.3-8.3L2.4 3h6.3l4.4 5.8L17.5 3Zm-1.1 16.1h1.7L7.7 4.8H5.9l10.5 14.3Z" />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" />
    </>
  ),
  github: (
    <path d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8Z" />
  ),
};

export function SocialIcon({ name, className }) {
  const paths = socialPaths[name];
  if (!paths) return null;

  const filled = name === "x" || name === "github" || name === "linkedin";

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths}
    </svg>
  );
}
