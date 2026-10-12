/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    // AVIF first: noticeably smaller than WebP for the portfolio gallery.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // The whole site is one page with ~12KB of Tailwind CSS: inlining it
    // removes the only render-blocking request before first paint.
    inlineCss: true,
    serverActions: {
      // Résumé uploads in the careers form are capped at 4MB; the extra
      // headroom covers multipart boundaries and the other fields.
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
