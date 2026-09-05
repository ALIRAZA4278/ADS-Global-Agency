import { ArrowUp } from "lucide-react";
import { brand, navLinks, services } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";
import { SocialIcon } from "@/components/ui/Icon";

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
        className="absolute bottom-[-14rem] left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--color-brand)_12%,transparent),transparent_70%)] blur-3xl"
      />

      <div className="shell relative py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="text-[1.05rem] font-semibold tracking-tight">
                {brand.name}
                <span className="text-gradient">.</span>
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {brand.tagline}
            </p>

            <ul className="mt-7 flex gap-2.5">
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

          <FooterColumn
            title="Navigate"
            links={navLinks.map((link) => ({ label: link.label, href: link.href }))}
          />

          <FooterColumn
            title="Services"
            links={services.items
              .slice(0, 6)
              .map((service) => ({ label: service.title, href: "#services" }))}
          />
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-faint">
            © {year} {brand.fullName}. All rights reserved.
          </p>

          <p className="text-xs text-faint">{brand.offices.join(" · ")}</p>

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

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
        {title}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-muted transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
