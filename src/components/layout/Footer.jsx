import { ArrowUp, Mail, Phone } from "lucide-react";
import { brand, navLinks } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";
import { SocialIcon } from "@/components/ui/Icon";

/**
 * Deliberately minimal: no link columns, no service list. Contact details,
 * socials and section links all run horizontally, with the offices on the
 * bottom line.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 rule-gradient opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-16rem] left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--color-brand)_12%,transparent),transparent_70%)] blur-3xl"
      />

      <div className="shell relative py-12">
        {/* Brand + section links */}
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <a href="#top" className="inline-flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="text-[1.05rem] font-semibold tracking-tight">
              {brand.name}
              <span className="text-gradient">.</span>
            </span>
          </a>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {[...navLinks, { label: "Contact", href: "#contact" }].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact details + socials */}
        <div className="mt-8 flex flex-col items-center gap-5 border-t border-line pt-8 md:flex-row md:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <a
              href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              {brand.phone}
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              {brand.email}
            </a>
          </div>

          <ul className="flex items-center gap-2.5">
            {brand.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:border-brand/50 hover:bg-brand/10 hover:text-white"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Offices + copyright */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-line pt-7 sm:flex-row sm:justify-between">
          <p className="text-xs text-faint">
            © {year} {brand.fullName}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-faint">
            {brand.offices.map((office, index) => (
              <li key={office} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true" className="text-line-strong">|</span>}
                {office}
              </li>
            ))}
          </ul>

          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-brand/50 group-hover:bg-brand/10">
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
