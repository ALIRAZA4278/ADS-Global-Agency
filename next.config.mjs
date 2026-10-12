/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    // AVIF first: noticeably smaller than WebP for the portfolio gallery.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverActions: {
      // Résumé uploads in the careers form are capped at 4MB; the extra
      // headroom covers multipart boundaries and the other fields.
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
