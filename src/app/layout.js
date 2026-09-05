import { Sora } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/site";
import { Providers } from "@/components/providers/Providers";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://adsglobalagency.com"),
  title: {
    default: `${brand.fullName} — Web design, development & growth`,
    template: `%s | ${brand.fullName}`,
  },
  description: brand.tagline,
  keywords: [
    "web development",
    "web design agency",
    "e-commerce development",
    "SEO services",
    "digital marketing",
    "branding",
  ],
  openGraph: {
    type: "website",
    siteName: brand.fullName,
    title: `${brand.fullName} — Web design, development & growth`,
    description: brand.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.fullName} — Web design, development & growth`,
    description: brand.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} scroll-smooth`}>
      <body className="min-h-svh bg-ink font-sans text-body antialiased">
        <a
          href="#services"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
