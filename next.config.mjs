/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      // Résumé uploads in the careers form are capped at 4MB; the extra
      // headroom covers multipart boundaries and the other fields.
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
