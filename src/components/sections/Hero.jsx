import { ArrowRight, Check } from "lucide-react";
import { hero } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Starfield } from "@/components/ui/Starfield";

/**
 * A server component: the hero is the page's LCP, so its copy is in the HTML
 * and painted on first frame, not held at opacity 0 until JavaScript hydrates
 * and fades it in. The entrance is a CSS slide (transform only, see
 * `animate-rise` in globals.css), which runs without JS and never hides the
 * text. Only the form and buttons are client islands.
 */
const step = (index) => ({ animationDelay: `${index * 80}ms` });

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-20 lg:pt-48 lg:pb-28">
      <Backdrop />

      <div className="shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,29rem)] lg:items-start lg:gap-x-16 lg:gap-y-10 xl:gap-x-20">
          {/* Pitch */}
          <div>
            <h1 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl xl:text-6xl">
              {hero.titleLines.map((line, index) => (
                <span
                  key={line.text}
                  style={step(index)}
                  className={cn(
                    "block animate-rise",
                    line.bold ? "font-bold" : "font-light text-body/90",
                    line.gradient && "text-gradient"
                  )}
                >
                  {line.text}
                </span>
              ))}
            </h1>

            <p
              style={step(2)}
              className="mt-7 max-w-lg animate-rise text-pretty leading-relaxed text-muted"
            >
              {hero.description}
            </p>

            <ul style={step(3)} className="mt-8 flex animate-rise flex-col gap-3">
              {hero.trust.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-body/85">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/10 text-accent">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div style={step(4)} className="mt-9 flex animate-rise flex-wrap items-center gap-4">
              <Button
                href={hero.secondaryCta.href}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                {hero.secondaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <TrustpilotButton href={hero.trustpilotHref} />
            </div>
          </div>

          {/* The form keeps the #contact anchor, so every existing CTA on the
              page still lands on it now that the contact section is gone. */}
          <div id="contact" style={step(2)} className="animate-rise lg:sticky lg:top-36">
            <div className="relative rounded-3xl border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-6 shadow-[0_40px_120px_-50px_var(--color-brand)] sm:p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-brand),var(--color-accent),transparent)]"
              />

              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                {hero.formTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {hero.formSubtitle}
              </p>

              <div className="mt-6">
                <InquiryForm idPrefix="hero" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// A pill button in Trustpilot's green, sized to sit beside the hero CTA.
// The star is hand-drawn rather than an external logo asset, which keeps the
// page free of outside image requests. Text is near-black, not white: white
// on this green is 2.6:1, well under the 4.5:1 that readable text needs.
const TRUSTPILOT_GREEN = "#00B67A";
const STAR_PATH =
  "M0,-10 L2.9,-3.1 L10,-3.1 L4.3,1.2 L6.5,8 L0,3.8 L-6.5,8 L-4.3,1.2 L-10,-3.1 L-2.9,-3.1 Z";

function TrustpilotButton({ href }) {
  const content = (
    <>
      <svg viewBox="-10 -10 20 20" aria-hidden="true" className="h-5 w-5">
        <path d={STAR_PATH} fill="currentColor" />
      </svg>
      Trustpilot Reviews
    </>
  );

  const className =
    "inline-flex h-14 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 sm:w-auto " +
    "text-base font-semibold text-[#04140d] shadow-[0_10px_40px_-14px_#00B67A]";
  const style = { backgroundColor: TRUSTPILOT_GREEN };

  // No profile URL yet — plain, not a link to nowhere. Set hero.trustpilotHref
  // once the Trustpilot page exists and this becomes a link automatically.
  if (!href) {
    return (
      <span className={className} style={style}>
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={style}
      className={cn(className, "transition-[filter] duration-300 hover:brightness-110")}
    >
      {content}
    </a>
  );
}

/**
 * Starfield, drifting colour blobs and a fade into the next section.
 *
 * The blobs are radial gradients that already fade to transparent, so they
 * need no `blur()` filter; a blur on an element this size is one of the
 * costliest things to repaint, and these animate continuously.
 */
function Backdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Starfield count={110} seed={11} />

      <div className="absolute right-[6%] top-[4%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-brand)_20%,transparent),transparent_65%)] animate-drift" />
      <div className="absolute left-[-12%] bottom-[-10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-accent)_14%,transparent),transparent_65%)] animate-drift-slow" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-ink),transparent)]" />
    </div>
  );
}
